import Book, { IBook } from '../../models/book.model';

interface ReadBookByIdInput {
  bookId: string;
}

interface ReadBooksByVolumeInput {
  filters?: Partial<{
    title: string;
    author: string;
    genre: string;
    publisher: string;
    availability: boolean;
  }>;
}

export const readBookById = async (input: ReadBookByIdInput): Promise<IBook | null> => {
  const { bookId } = input;

  // Find the book by ID
  const book = await Book.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error('Book not found');
  }

  return book;
};

export const readBooksByVolume = async (input: ReadBooksByVolumeInput): Promise<IBook[]> => {
  const { filters } = input;

  // Build query based on filters
  const query: any = { isDeleted: false };

  if (filters?.title) {
    query.title = { $regex: filters.title, $options: 'i' };
  }

  if (filters?.author) {
    query.author = { $regex: filters.author, $options: 'i' };
  }

  if (filters?.genre) {
    query.genre = { $regex: filters.genre, $options: 'i' };
  }

  if (filters?.publisher) {
    query.publisher = { $regex: filters.publisher, $options: 'i' };
  }

  if (filters?.availability !== undefined) {
    query.availability = filters.availability;
  }

  // Find books matching the query
  const books = await Book.find(query);

  return books;
};