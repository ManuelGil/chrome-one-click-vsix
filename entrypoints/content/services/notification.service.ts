/**
 * @module NotificationService
 * @description A service for displaying non-intrusive toast notifications.
 */

import '@/assets/toast.css';

/**
 * Displays a toast notification with a specified message.
 *
 * The notification appears at the top-right corner of the screen and disappears
 * automatically after a few seconds.
 *
 * @param {string} message - The message to display in the notification.
 * @param {number} [duration=3000] - The duration in milliseconds for the toast to be visible.
 */
export function showToast(message: string, duration: number = 3000): void {
  // Create the toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;

  // Add it to the DOM
  document.body.appendChild(toast);

  // Animate it in
  setTimeout(() => {
    toast.classList.add('show');
  }, 10); // A small delay to ensure the transition triggers

  // Set a timeout to remove the toast
  setTimeout(() => {
    toast.classList.remove('show');
    // Remove the element from the DOM after the fade-out transition
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }, duration);
}
