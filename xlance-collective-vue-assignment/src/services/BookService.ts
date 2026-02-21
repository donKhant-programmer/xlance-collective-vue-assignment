// services/BookService.ts
import type { Book } from '@/models/book'

let books: Book[] = [
  { id: 1, title: 'The Great Gatsby', year: 1925, author: 'F. Scott Fitzgerald', category: 'Classic', status: 'AVAILABLE' },
  { id: 2, title: 'Pride and Prejudice', year: 1813, author: 'Jane Austen', category: 'Romance', status: 'BORROWED' },
]

export class BookService {
  static async getAll(): Promise<Book[]> {
    return books
  }

  static async add(book: Book): Promise<void> {
    book.id = books.length + 1
    books.push(book)
  }
}