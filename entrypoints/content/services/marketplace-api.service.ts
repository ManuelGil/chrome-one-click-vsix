/**
 * @module MarketplaceApiService
 * @description Service to interact with the VSCode Marketplace API.
 */

import {
  API_HEADERS,
  MARKETPLACE_API_URL,
  VSIX_ASSET_TYPE,
  type ExtensionFile,
  type ExtensionQueryBody,
  type ExtensionQueryResponse,
} from '../models/marketplace-api.model';

/**
 * Fetches the VSIX download URL from the Visual Studio Marketplace API.
 *
 * This function constructs a query to find a specific extension and retrieves the
 * direct download link for its VSIX package.
 *
 * @param {string} publisher - The name of the extension publisher.
 * @param {string} extensionName - The name of the extension.
 * @returns {Promise<string>} A promise that resolves to the VSIX file URL.
 * @throws {Error} If the API request fails, the extension is not found, or the VSIX asset is missing.
 */
export async function getVsixFileUrl(
  publisher: string,
  extensionName: string,
): Promise<string> {
  const queryBody: ExtensionQueryBody = {
    filters: [
      {
        criteria: [
          {
            filterType: 7, // Corresponds to searching by extension name
            value: `${publisher}.${extensionName}`,
          },
        ],
        pageNumber: 1,
        pageSize: 1,
        sortBy: 0,
        sortOrder: 0,
      },
    ],
    assetTypes: [VSIX_ASSET_TYPE],
    flags: 914, // Includes metadata flags
  };

  const response = await fetch(MARKETPLACE_API_URL, {
    method: 'POST',
    headers: API_HEADERS,
    body: JSON.stringify(queryBody),
  });

  if (!response.ok) {
    throw new Error(`Extension query failed with status: ${response.status}`);
  }

  const data: ExtensionQueryResponse = await response.json();

  const extensions = data.results[0]?.extensions;
  if (!extensions || extensions.length === 0) {
    throw new Error(`Extension not found: "${publisher}.${extensionName}"`);
  }

  const versionInfo = extensions[0].versions[0];
  if (!versionInfo) {
    throw new Error(`No versions found for "${publisher}.${extensionName}".`);
  }

  const vsixAsset = versionInfo.files.find(
    (file: ExtensionFile) => file.assetType === VSIX_ASSET_TYPE,
  );
  if (!vsixAsset) {
    throw new Error(`VSIX file not found for "${publisher}.${extensionName}".`);
  }

  return vsixAsset.source;
}
