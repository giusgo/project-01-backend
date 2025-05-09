import { IUserPermissions } from '../models/user.model';
import bcrypt from 'bcrypt';

export interface SeedUser {
  email: string;
  password: string;
  permissions: IUserPermissions;
}

export interface SeedBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  publisher: string;
}

export const users: SeedUser[] = [
  {
    email: 'admin@library.com',
    password: 'admin123',
    permissions: {
      createBooks: true,
      modifyUsers: true,
      modifyBooks: true,
      deleteUsers: true,
      deleteBooks: true,
    },
  },
  {
    email: 'librarian@library.com',
    password: 'librarian123',
    permissions: {
      createBooks: true,
      modifyUsers: false,
      modifyBooks: true,
      deleteUsers: false,
      deleteBooks: true,
    },
  },
  {
    email: 'user@library.com',
    password: 'user123',
    permissions: {
      createBooks: false,
      modifyUsers: false,
      modifyBooks: false,
      deleteUsers: false,
      deleteBooks: false,
    },
  },
];

export const books: SeedBook[] = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    publicationDate: new Date('1960-07-11'),
    publisher: 'J. B. Lippincott & Co.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    publicationDate: new Date('1949-06-08'),
    publisher: 'Secker & Warburg',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    publicationDate: new Date('1925-04-10'),
    publisher: 'Charles Scribner\'s Sons',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    publicationDate: new Date('1813-01-28'),
    publisher: 'T. Egerton, Whitehall',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    publicationDate: new Date('1937-09-21'),
    publisher: 'George Allen & Unwin',
  },
];