/**
 * @module FileUtils
 * @description Provides utility functions for file handling, such as triggering downloads.
 */

/**
 * Triggers a browser download for a given Blob.
 *
 * This function creates a temporary anchor element, assigns the Blob's object URL to it,
 * and simulates a click to start the download, then cleans up the resources.
 *
 * @param {Blob} blob - The file content as a Blob.
 * @param {string} fileName - The desired name for the downloaded file.
 */
export function triggerBrowserDownload(blob: Blob, fileName: string): void {
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);

  link.href = objectUrl;
  link.download = fileName;

  // Append to the DOM, trigger the click, and then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the object URL to free up memory
  URL.revokeObjectURL(objectUrl);
}
