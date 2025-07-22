/**
 * @module DomUtils
 * @description Provides utilities for interacting with the DOM, like waiting for an element to be ready.
 */

/**
 * Waits for a DOM element to be available, using a MutationObserver.
 *
 * This function returns a promise that resolves with the element once it's found
 * in the DOM. It includes a timeout to prevent the observer from running indefinitely.
 *
 * @param {string} selector - The CSS selector of the element to wait for.
 * @param {number} [timeout=10000] - The maximum time to wait in milliseconds.
 * @returns {Promise<Element>} A promise that resolves with the found element.
 * @throws {Error} If the element is not found within the specified timeout.
 */
export function onElementReady(
  selector: string,
  timeout: number = 10000,
): Promise<Element> {
  return new Promise((resolve, reject) => {
    // 1. Check if the element already exists
    const foundElement = document.querySelector(selector);
    if (foundElement) {
      resolve(foundElement);
      return;
    }

    // 2. Set up a MutationObserver to watch for changes
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        clearTimeout(timeoutId);
        resolve(element);
      }
    });

    // 3. Set a timeout to reject the promise if the element isn't found
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `Element with selector "${selector}" not found within ${timeout}ms.`,
        ),
      );
    }, timeout);

    // 4. Start observing the DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
