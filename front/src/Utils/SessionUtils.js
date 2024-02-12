/**
 * It returns the value of the key that is passed to it.
 * @param value - The value of the session you want to get.
 * @returns The value of the key in localStorage.
 */
export function getSession(value) {
  return localStorage.getItem(value);
}
