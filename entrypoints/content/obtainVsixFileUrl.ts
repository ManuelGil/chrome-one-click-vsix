/**
 * Calls the VSCode Marketplace Gallery API to retrieve the real VSIX download URL.
 */
export async function obtainVsixFileUrl(
  publisher: string,
  extensionName: string,
): Promise<string> {
  const queryBody = {
    filters: [
      {
        criteria: [
          {
            filterType: 7,
            value: `${publisher}.${extensionName}`,
          },
        ],
        pageNumber: 1,
        pageSize: 1,
        sortBy: 0,
        sortOrder: 0,
      },
    ],
    assetTypes: ['Microsoft.VisualStudio.Services.VSIXPackage'],
    flags: 914,
  };

  const response = await fetch(
    'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json;api-version=3.0-preview.1',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryBody),
    },
  );

  if (!response.ok) {
    throw new Error(`Extension query failed with status ${response.status}`);
  }

  const data = (await response.json()) as {
    results: Array<{
      extensions: Array<{
        extensionName: string;
        publisher: { publisherName: string };
        versions: Array<{
          version: string;
          files: Array<{
            assetType: string;
            source: string;
          }>;
        }>;
      }>;
    }>;
  };

  const extensions = data.results[0]?.extensions;
  if (!extensions || extensions.length === 0) {
    throw new Error(`Extension "${publisher}.${extensionName}" not found.`);
  }

  const versionInfo = extensions[0].versions[0];
  if (!versionInfo) {
    throw new Error(`No versions found for "${publisher}.${extensionName}".`);
  }

  const vsixAsset = versionInfo.files.find(
    (file) => file.assetType === 'Microsoft.VisualStudio.Services.VSIXPackage',
  );
  if (!vsixAsset) {
    throw new Error(`VSIX file not found for "${publisher}.${extensionName}".`);
  }

  return vsixAsset.source;
}
