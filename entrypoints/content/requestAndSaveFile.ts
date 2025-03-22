/**
 * Fetches the VSIX file as a Blob and forces the download using an <a download="...">.
 * This effectively renames any .zip content to .vsix, preventing user confusion.
 */
export async function requestAndSaveFile(
  url: string,
  finalName: string,
): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch the file from ${url}. Status: ${response.status}`,
    );
  }

  const blob = await response.blob();
  const link = document.createElement('a');
  const objectUrl = URL.createObjectURL(blob);

  link.href = objectUrl;
  link.download = finalName; // e.g. "publisher.extension.vsix"

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(objectUrl);
}
