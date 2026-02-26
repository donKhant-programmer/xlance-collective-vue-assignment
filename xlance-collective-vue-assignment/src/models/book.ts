export type BookStatus = 'AVAILABLE' | 'BORROWED';

export interface Book {
  id: number;
  title: string;
  year: number;
  authorId: number;
  categoryId: number;
  status: BookStatus;
  description?: string;
  coverImageUrl?: string;
}
