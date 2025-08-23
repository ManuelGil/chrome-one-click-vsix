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
 * @param {boolean} [silent=false] - If true, resolves with null instead of throwing an error when element is not found.
 * @returns {Promise<Element|null>} A promise that resolves with the found element or null if silent mode is on and element is not found.
 * @throws {Error} If the element is not found within the specified timeout and silent mode is off.
 */
export function onElementReady(
  selector: string,
  timeout: number = 10000,
  silent: boolean = false,
): Promise<Element | null> {
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
      if (silent) {
        // If silent mode is enabled, resolve with null instead of throwing an error
        resolve(null);
      } else {
        reject(
          new Error(
            `Element with selector "${selector}" not found within ${timeout}ms.`,
          ),
        );
      }
    }, timeout);

    // 4. Start observing the DOM
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Checks if an element matching the selector exists in the DOM.
 *
 * @param {string} selector - The CSS selector to check.
 * @returns {boolean} True if the element exists, false otherwise.
 */
export function isElementPresent(selector: string): boolean {
  return document.querySelector(selector) !== null;
}

/**
 * Safely injects an element into a parent matching the selector.
 * Returns true if successful, false if the parent element was not found.
 *
 * @param {string} parentSelector - The CSS selector for the parent element.
 * @param {HTMLElement} element - The element to inject.
 * @param {'appendChild'|'prepend'|'before'|'after'|'replaceWith'} [method='appendChild'] - Insertion method.
 * @returns {boolean} True if the element was inserted, false otherwise.
 */
export function safeInject(
  parentSelector: string,
  element: HTMLElement,
  method:
    | 'appendChild'
    | 'prepend'
    | 'before'
    | 'after'
    | 'replaceWith' = 'appendChild',
): boolean {
  const parent = document.querySelector(parentSelector);
  if (!parent) return false;

  switch (method) {
    case 'appendChild':
      parent.appendChild(element);
      break;
    case 'prepend':
      parent.prepend(element);
      break;
    case 'before':
      parent.before(element);
      break;
    case 'after':
      parent.after(element);
      break;
    case 'replaceWith':
      parent.replaceWith(element);
      break;
  }

  return true;
}
