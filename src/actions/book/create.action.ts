import Book, { IBook } from '../../models/book.model';

interface CreateBookInput {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  publisher: string;
}

export const createBook = async (input: CreateBookInput): Promise<IBook> => {
  const { title, author, genre, publicationDate, publisher } = input;

  // Create a new book
  const newBook = new Book({
    title,
    author,
    genre,
    publicationDate,
    publisher,
    availability: true, // Default availability to true
  });

  // Save the book to the database
  await newBook.save();

  return newBook;
};