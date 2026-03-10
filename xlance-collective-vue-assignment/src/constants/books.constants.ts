import type { Book } from '@/models/book';

// Mock data, initialized as empty array with sample books
export const books: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    year: 1925,
    authorId: 1,
    categoryId: 1,
    status: 'AVAILABLE',
    description: 'A classic novel...',
    coverImageUrl: '',
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    year: 1813,
    authorId: 2,
    categoryId: 1,
    status: 'BORROWED',
    description: 'A romantic novel about manners and courtship in early 19th century England.',
    coverImageUrl: '',
  },
];
