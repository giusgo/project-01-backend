import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { users, books } from '../config/seed.config';
import { connectDB } from '../config/database';
import User from '../models/user.model';
import Book from '../models/book.model';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await clearDatabase();

    // Seed users
    await seedUsers();

    // Seed books
    await seedBooks();

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

const clearDatabase = async (): Promise<void> => {
  console.log('Clearing existing data...');
  
  await User.deleteMany({});
  console.log('Users collection cleared');
  
  await Book.deleteMany({});
  console.log('Books collection cleared');
};

const seedUsers = async (): Promise<void> => {
  console.log('Seeding users...');
  
  const saltRounds = 10;
  
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    
    await User.create({
      email: user.email,
      password: hashedPassword,
      permissions: user.permissions,
    });
  }
  
  console.log(`${users.length} users created`);
};

const seedBooks = async (): Promise<void> => {
  console.log('Seeding books...');
  
  for (const book of books) {
    await Book.create({
      title: book.title,
      author: book.author,
      genre: book.genre,
      publicationDate: book.publicationDate,
      publisher: book.publisher,
      availability: true,
    });
  }
  
  console.log(`${books.length} books created`);
};

seedDatabase();