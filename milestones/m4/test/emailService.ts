/*
* This is a common user notification system, something often used in web applications
* (but with duplicated functionality). 
* It includes functions to send different types of emails to users, such as:
* - welcome emails
* - password reset emails
* - admin alerts
* Each function takes a user object as an argument and constructs a specific email message 
* based on the user's information.
*/
// emailService.ts

type User = {
    name: string;
    email: string;
    isAdmin: boolean;
}

function sendWelcomeEmail(user: User) {
    const subject = "Welcome to Our Service!";
    const message = `Hello ${user.name}, welcome to our platform! We're excited to have you on board.`;
    console.log(`Email to ${user.email}: ${subject}\n${message}`);
}

function sendPasswordResetEmail(user: User) {
  const subject = "Reset Your Password";
  const message = `Hi ${user.name}, you can reset your password here: [link]`;
  console.log(`Email to ${user.email}: ${subject}\n${message}`);
}

function sendAdminAlert(user: User) {
  const subject = "Admin Alert";
  const message = `Dear ${user.name}, there was an issue in the system.`;
  console.log(`Email to ${user.email}: ${subject}\n${message}`);
}