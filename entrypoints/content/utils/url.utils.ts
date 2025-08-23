/**
 * @module UrlUtils
 * @description Provides utility functions for URL parsing and manipulation.
 */

/**
 * Represents the parsed extension identifier from the URL.
 */
export interface ExtensionIdentifier {
  publisher: string;
  extensionName: string;
}

/**
 * Parses the extension identifier (publisher and name) from the current URL.
 *
 * It expects the URL to have an `itemName` query parameter in the format `publisher.extensionName`.
 *
 * @returns {ExtensionIdentifier} The parsed publisher and extension name.
 * @throws {Error} If the `itemName` parameter is missing or malformed.
 */
export function parseExtensionIdentifierFromUrl(): ExtensionIdentifier {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('itemName');

  if (!itemName) {
    throw new Error('Extension ID not found in the URL.');
  }

  const parts = itemName.split('.');
  if (parts.length < 2) {
    throw new Error(
      'Unable to parse publisher or extension name from the URL.',
    );
  }

  const publisher = parts[0];
  const extensionName = parts.slice(1).join('.');

  return { publisher, extensionName };
}

/**
 * Returns true if the current URL corresponds to an extension detail page.
 * It checks for the presence of the 'itemName' query parameter.
 */
export function isExtensionDetailPage(): boolean {
  const params = new URLSearchParams(window.location.search);
  const itemName = params.get('itemName');
  return !!itemName;
}
