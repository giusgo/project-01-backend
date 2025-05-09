import Book, { IBook } from "../../models/book.model";

interface UpdateBookInput {
  bookId: string;
  updates: Partial<{
    title: string;
    author: string;
    genre: string;
    publicationDate: Date;
    publisher: string;
    availability: boolean;
  }>;
}

export const updateBook = async (
  input: UpdateBookInput
): Promise<IBook | null> => {
  const { bookId, updates } = input;

  // Find the book by ID
  const book = await Book.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("Book not found");
  }

  // Update fields if provided
  if (updates.title) {
    book.title = updates.title;
  }

  if (updates.author) {
    book.author = updates.author;
  }

  if (updates.genre) {
    book.genre = updates.genre;
  }

  if (updates.publicationDate) {
    book.publicationDate = updates.publicationDate;
  }

  if (updates.publisher) {
    book.publisher = updates.publisher;
  }

  if (updates.availability !== undefined) {
    book.availability = updates.availability;
  }

  // Save the updated book to the database
  await book.save();

  return book;
};
