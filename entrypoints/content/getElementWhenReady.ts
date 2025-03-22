/**
 * Observes the DOM until the specified selector is found, then calls the callback.
 */
export function getElementWhenReady(
  selector: string,
  callback: (el: Element) => void,
): void {
  const found = document.querySelector(selector);

  if (found) {
    callback(found);
    return;
  }

  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);

    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}
