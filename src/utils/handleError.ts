/**
 * Handles and logs an error message.
 * @param err An error from a catch clause
 * @returns The error message
 */
export const handleError = (err: unknown): string => {
  console.error(err);
  if (err instanceof Error) {
    return err.message;
  } else {
    return JSON.stringify(err);
  }
}