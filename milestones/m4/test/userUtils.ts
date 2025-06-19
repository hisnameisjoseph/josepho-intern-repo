/**
 * userUtils.ts
 * Utility for formatting user information with optional email masking.
 */

export interface User {
  firstName: string;
  lastName: string;
  email?: string; // Email is optional
}

/**
 * Returns formatted user info: "First Last <email>"
 * - Masks email if maskEmail is true
 * - Handles missing or invalid inputs with clear guard clauses
 *
 * @param user - User object with firstName, lastName, and optional email
 * @param maskEmail - If true, masks email for privacy
 */
export function formatUser(user: User, maskEmail = false): string {
  // Guard against null, non-object, or incomplete user input
  if (!user || typeof user !== 'object') return 'Invalid user';
  if (!user.firstName || !user.lastName) return 'Missing name';

  const fullName = `${user.firstName} ${user.lastName}`;

  // Handle optional email and apply masking if needed
  const email = user.email
    ? maskEmail
      ? user.email.length > 2
        ? user.email.replace(/(.).+(@.+)/, '$1***$2')
        : '***@***'
      : user.email
    : '';

  return `${fullName} <${email}>`;
}