export interface Book {
    id: number
    title: string
    author: string
    category: string
    year: number
    status: 'AVAILABLE' | 'BORROWED'
  }