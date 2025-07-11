import { AppDataSource } from '../data-source';
import { User } from '../user/entities/user.entity'; // <-- use correct entity

// This script is generated by ChatGPT, dummy data created by Joseph Ho

async function seedUsers() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const users = [
    { firstName: 'Jeffery', lastName: 'Ho', age: 23, email: 'jeffery.ho@example.com' },
    { firstName: 'Jasmin', lastName: 'Ho', age: 21, email: 'jasmin.ho@example.com' },
    { firstName: 'Joseph', lastName: 'Liao', age: 26, email: 'joseph.liao@example.com' },
    { firstName: 'Tiffany', lastName: 'Liao', age: 23, email: 'tiffany.liao@example.com' },
  ];

  for (const data of users) {
    const user = userRepo.create(data);
    await userRepo.save(user);
    console.log(`Inserted: ${user.firstName} ${user.lastName}`);
  }

  await AppDataSource.destroy();
}

seedUsers().catch((err) => {
  console.error('Seeding failed:', err);
});