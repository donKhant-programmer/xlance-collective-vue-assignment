// models/book.ts
export interface Book {
  id: number
  title: string
  year: number
  author: string
  category: string
  status: 'AVAILABLE' | 'BORROWED'
}