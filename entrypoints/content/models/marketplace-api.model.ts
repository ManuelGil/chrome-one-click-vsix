/**
 * @module MarketplaceApiModel
 * @description Defines the data structures and constants for interacting with the Visual Studio Marketplace API.
 */

// --- API Constants ---

/**
 * The endpoint URL for the Visual Studio Marketplace extension query API.
 */
export const MARKETPLACE_API_URL =
  'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';

/**
 * The asset type for the VSIX package in the Marketplace API response.
 */
export const VSIX_ASSET_TYPE = 'Microsoft.VisualStudio.Services.VSIXPackage';

/**
 * API headers required for the extension query request.
 */
export const API_HEADERS = {
  'Accept': 'application/json;api-version=3.0-preview.1',
  'Content-Type': 'application/json',
};

// --- API Interfaces ---

/**
 * Represents a file asset associated with an extension version.
 */
export interface ExtensionFile {
  assetType: string;
  source: string;
}

/**
 * Represents a specific version of an extension.
 */
export interface ExtensionVersion {
  version: string;
  files: ExtensionFile[];
}

/**
 * Represents a Visual Studio Code extension.
 */
export interface Extension {
  extensionName: string;
  publisher: {
    publisherName: string;
  };
  versions: ExtensionVersion[];
}

/**
 * Represents a single result from the extension query.
 */
export interface QueryResult {
  extensions: Extension[];
}

/**
 * Represents the overall response from the Marketplace API.
 */
export interface ExtensionQueryResponse {
  results: QueryResult[];
}

/**
 * Represents the body of the extension query request.
 */
export interface ExtensionQueryBody {
  filters: Array<{
    criteria: Array<{
      filterType: number;
      value: string;
    }>;
    pageNumber: number;
    pageSize: number;
    sortBy: number;
    sortOrder: number;
  }>;
  assetTypes: string[];
  flags: number;
}
