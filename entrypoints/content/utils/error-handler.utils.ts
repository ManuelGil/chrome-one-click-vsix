/**
 * @module ErrorHandler
 * @description Provides a consistent way to handle and display errors to the user.
 */

import { showToast } from '../services/notification.service';

/**
 * Displays an error message to the user via a non-intrusive toast notification.
 *
 * It formats the error message from different possible types (Error, string, unknown)
 * to ensure a consistent output.
 *
 * @param {unknown} error - The error to be displayed. Can be an Error object, a string, or any other type.
 */
export function showError(error: unknown): void {
  let message = 'An unexpected error occurred.';

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string' && error.trim() !== '') {
    message = error;
  }

  // Use the toast notification service to display the error
  showToast(message);
}
