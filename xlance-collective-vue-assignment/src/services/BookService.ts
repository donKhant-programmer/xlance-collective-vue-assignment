import type { Book } from '@/models/book';

import { books as booksMock } from '@/constants/books';

let books = [...booksMock];

export class BookService {
  // Get all books
  static async getAll(): Promise<Book[]> {
    return books;
  }

  // Add a new book
  static async add(book: Book): Promise<void> {
    // Extract logic to get next ID
    const getNextId = (): number => {
      if (books.length === 0) return 1;

      const lastBook = books[books.length - 1];
      // Add type guard to ensure lastBook exists
      if (!lastBook) return 1;

      return lastBook.id + 1;
    };

    book.id = getNextId();

    // If a new cover image File is provided, convert to object URL for now
    if ((book as any).coverImage instanceof File) {
      const file = (book as any).coverImage as File;
      book.coverImageUrl = URL.createObjectURL(file);
    }

    books.push(book);
  }

  // Update an existing book
  static async update(updated: Book & { coverImage?: File }): Promise<void> {
    const index = books.findIndex((b) => b.id === updated.id);
    if (index !== -1) {
      // Update cover image if new file provided
      if (updated.coverImage instanceof File) {
        updated.coverImageUrl = URL.createObjectURL(updated.coverImage);
      }
      books[index] = { ...books[index], ...updated };
    }
  }

  // Delete a book
  static async delete(id: number): Promise<void> {
    books = books.filter((b) => b.id !== id);
  }

  // Get book by id
  static async getById(id: number): Promise<Book | undefined> {
    return books.find((b) => b.id === id);
  }
}
