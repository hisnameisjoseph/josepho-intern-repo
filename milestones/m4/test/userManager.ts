export interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

const users: UserProfile[] = [
  { firstName: 'john', lastName: 'DOE', age: 25, email: 'john@example.com', isAdmin: false },
  { firstName: 'Jane', lastName: 'Smith', age: 17, email: 'jane@example.com', isAdmin: true },
  { firstName: 'bob', lastName: 'lee', age: 33, email: 'bob@example.com', isAdmin: false }
];

function m(users: UserProfile[]) {
  for (let i = 0; i < users.length; i++) {
    let full = users[i].firstName.trim() + ' ' + users[i].lastName.trim();
    full = full.charAt(0).toUpperCase() + full.slice(1).toLowerCase();

    let u = users[i].email;
    if (u.length > 2) {
      u = u[0] + '***' + u.slice(u.indexOf('@'));
    }

    if (users[i].age < 18) {
      console.log(`Skipping underage user: ${full}`);
    } else {
      if (users[i].isAdmin) {
        console.log('ADMIN NOTICE');
      }

      console.log('Name: ' + full);
      console.log('Email: ' + u);
      console.log('Age: ' + users[i].age);
      if (users[i].age > 30) {
        console.log('Eligible for Premium Offer!');
      }
    }
  }
}

m(users);