import type { Book } from '@/models/book'

const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    year: 1925,
    status: 'AVAILABLE',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    year: 1949,
    status: 'BORROWED',
  },
]

export const BookService = {
  getAll(): Promise<Book[]> {
    return Promise.resolve(books)
  },
}