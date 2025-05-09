import Book from "../../models/book.model";

interface DeleteBookInput {
  bookId: string;
}

export const deleteBook = async (input: DeleteBookInput): Promise<void> => {
  const { bookId } = input;

  // Find the book by ID
  const book = await Book.findById(bookId);

  if (!book || book.isDeleted) {
    throw new Error("Book not found");
  }

  // Perform soft delete by setting isDeleted to true
  book.isDeleted = true;

  // Save the updated book to the database
  await book.save();
};
