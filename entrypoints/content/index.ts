import '@/assets/buttons.css';
import { fetchFileAsBlob } from './services/file-download.service';
import { triggerBrowserDownload } from './utils/file.utils';
import { getVsixFileUrl } from './services/marketplace-api.service';
import { onElementReady } from './utils/dom.utils';
import { showError } from './utils/error-handler.utils';
import { parseExtensionIdentifierFromUrl } from './utils/url.utils';

/**
 * Defines and initializes the content script for the VSIX downloader extension.
 * Separates UI, validation, and business logic for maintainability.
 */
export default defineContentScript({
  matches: ['*://marketplace.visualstudio.com/*'],
  /**
   * Main entry point for the content script. Adds a download button and handles its logic.
   */
  async main() {
    try {
      // Wait for the target element to appear in the DOM
      const actionContainer = await onElementReady('.ux-item-action');

      // Create and style the download button
      const downloadButton = document.createElement('button');
      downloadButton.textContent = 'Download Extension';
      downloadButton.type = 'button';
      downloadButton.className =
        'ms-Button ux-button download ms-Button--default root-39';
      downloadButton.style.marginTop = '10px';

      // Insert the button and add the event listener
      actionContainer.insertAdjacentElement('afterend', downloadButton);
      downloadButton.addEventListener('click', handleDownloadClick);
    } catch (error: unknown) {
      showError(error);
    }
  },
});

/**
 * Handles the click event for the download button.
 * Validates the URL, fetches the VSIX URL, and triggers the download.
 */
async function handleDownloadClick(): Promise<void> {
  try {
    // 1. Parse extension details from the URL
    const { publisher, extensionName } = parseExtensionIdentifierFromUrl();

    // 2. Retrieve the VSIX download URL from the Marketplace API
    const vsixUrl = await getVsixFileUrl(publisher, extensionName);

    // 3. Fetch the file as a Blob
    const fileBlob = await fetchFileAsBlob(vsixUrl);

    // 4. Trigger the browser download
    const fileName = `${publisher}.${extensionName}.vsix`;
    triggerBrowserDownload(fileBlob, fileName);
  } catch (error: unknown) {
    // 4. Display any errors to the user
    showError(error);
  }
}
