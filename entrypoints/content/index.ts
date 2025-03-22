import '@/assets/buttons.css';
import { requestAndSaveFile } from './requestAndSaveFile';
import { obtainVsixFileUrl } from './obtainVsixFileUrl';
import { getElementWhenReady } from './getElementWhenReady';

export default defineContentScript({
  matches: ['*://marketplace.visualstudio.com/*'],
  main() {
    getElementWhenReady('.ux-item-action', (actionContainer) => {
      // Create the download button
      const downloadButton = document.createElement('button');
      downloadButton.textContent = 'Download Extension';
      downloadButton.type = 'button';
      downloadButton.className =
        'ms-Button ux-button download ms-Button--default root-39';
      downloadButton.style.marginTop = '10px';

      actionContainer.insertAdjacentElement('afterend', downloadButton);

      downloadButton.addEventListener('click', async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const itemName = params.get('itemName');
          if (!itemName) {
            alert('Extension ID not found in the URL.');
            return;
          }

          const [publisher, extensionName] = itemName.split('.');
          if (!publisher || !extensionName) {
            alert('Unable to parse publisher or extension name from the URL.');
            return;
          }

          // 1. Get the real VSIX URL from the Marketplace
          const vsixUrl = await obtainVsixFileUrl(publisher, extensionName);

          // 2. Force download with .vsix extension (renames any .zip content)
          await requestAndSaveFile(
            vsixUrl,
            `${publisher}.${extensionName}.vsix`,
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert(
              error?.message ?? 'An error occurred while downloading the VSIX.',
            );
          }
        }
      });
    });
  },
});
