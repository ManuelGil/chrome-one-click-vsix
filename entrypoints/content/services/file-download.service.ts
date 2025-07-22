/**
 * @module FileDownloadService
 * @description A service to fetch files as Blobs from a given URL.
 */

/**
 * Fetches a file from a URL and returns it as a Blob.
 *
 * This function is responsible for the network request and handling potential
 * fetch errors. It does not interact with the DOM.
 *
 * @param {string} url - The URL of the file to fetch.
 * @returns {Promise<Blob>} A promise that resolves to the file content as a Blob.
 * @throws {Error} If the fetch request fails.
 */
export async function fetchFileAsBlob(url: string): Promise<Blob> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch file from ${url}. Status: ${response.status}`,
    );
  }

  return response.blob();
}
