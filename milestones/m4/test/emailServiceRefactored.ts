// This code refactors the email sending functionality to use a more modular approach 
// (with helper function) and improves the readability and maintainability of the code.
// emailServiceRefactored.ts

function sendEmail(user: User, subject: string, message: string) {
  console.log(`Email to ${user.email}: ${subject}\n${message}`);
}

function sendWelcomeEmail(user: User) {
  const subject = "Welcome to Our Service!";
  const message = `Hello ${user.name}, welcome to our platform! We're excited to have you on board.`;
  sendEmail(user, subject, message);
}

function sendPasswordResetEmail(user: User) {
  const subject = "Reset Your Password";
  const message = `Hi ${user.name}, you can reset your password here: [link]`;
  sendEmail(user, subject, message);
}

function sendAdminAlert(user: User) {
  const subject = "Admin Alert";
  const message = `Dear ${user.name}, there was an issue in the system.`;
  sendEmail(user, subject, message);
}