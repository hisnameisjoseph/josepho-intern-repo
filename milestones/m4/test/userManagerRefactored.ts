import type { UserProfile } from './userManager';

const users: UserProfile[] = [
  { firstName: 'john', lastName: 'DOE', age: 25, email: 'john@example.com', isAdmin: false },
  { firstName: 'Jane', lastName: 'Smith', age: 17, email: 'jane@example.com', isAdmin: true },
  { firstName: 'bob', lastName: 'lee', age: 33, email: 'bob@example.com', isAdmin: false }
];

// Format full name with proper casing
function formatFullName(user: UserProfile): string {
  const fullName = `${user.firstName.trim()} ${user.lastName.trim()}`;
  return fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase();
}

// Mask email for privacy
function maskEmail(email: string): string {
  if (email.length <= 2) return '***@***';
  const [firstChar, domain] = [email[0], email.slice(email.indexOf('@'))];
  return `${firstChar}***${domain}`;
}

// Display user details
function displayUserDetails(user: UserProfile): void {
  const fullName = formatFullName(user);
  const maskedEmail = maskEmail(user.email);

  if (user.age < 18) {
    console.log(`Skipping underage user: ${fullName}`);
    return;
  }

  if (user.isAdmin) {
    console.log('ADMIN NOTICE');
  }

  console.log(`Name: ${fullName}`);
  console.log(`Email: ${maskedEmail}`);
  console.log(`Age: ${user.age}`);

  if (user.age > 30) {
    console.log('Eligible for Premium Offer!');
  }
}

// Process all users
function processUsers(users: UserProfile[]): void {
  users.forEach(displayUserDetails);
}

processUsers(users);