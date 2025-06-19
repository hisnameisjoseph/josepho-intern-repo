/** 
 * userUtils.ts
 * This module provides utility functions for formatting user information. 
 * It includes an options parameter for email masking.
 **/

export interface User {
  firstName: string;
  lastName: string;
  email?: string;
}

export function formatUser(user: User, maskEmail = false): string {
  const fullName = `${user.firstName} ${user.lastName}`;

  const email = user.email
    ? maskEmail
      ? user.email.replace(/(.).+(@.+)/, '$1***$2')
      : user.email
    : '';

  return `${fullName} <${email}>`;
}