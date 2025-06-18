interface User {
  id: string;
  name: string;
  email?: string;
}

class CleanUserManager {
  private users: User[] = [];
  private database: Record<string, User> = {};

  addUser(user: User, options: { sendEmail?: boolean; saveToDb?: boolean; logAction?: boolean } = {}) {
    const sanitizedUser = this.sanitizeUser(user);
    this.users.push(sanitizedUser);

    if (options.saveToDb) {
      this.saveUser(sanitizedUser);
    }

    if (options.sendEmail) {
      this.sendEmailToUser(sanitizedUser);
    }

    if (options.logAction) {
      this.logUserAddition(sanitizedUser);
    }
  }

  getUserById(userId: string): User | undefined {
    return this.database[userId];
  }

  private sanitizeUser(user: User): User {
    return {
      ...user,
      name: user.name.trim()
    };
  }

  private saveUser(user: User): void {
    this.database[user.id] = user;
  }

  private sendEmailToUser(user: User): void {
    console.log(`Sending email to ${user.name}`);
  }

  private logUserAddition(user: User): void {
    console.log(`User added: ${JSON.stringify(user)}`);
  }
}

// Example usage
const userManager = new CleanUserManager();
userManager.addUser({ id: "123", name: " Joseph " }, { sendEmail: true, saveToDb: true, logAction: true });