export type BookStatus = 'AVAILABLE' | 'BORROWED'

export interface Book {
  id: number
  title: string
  year: number
  author: string
  category: string
  status: BookStatus
  description?: string           // Book summary
  coverImageUrl?: string        // URL of cover image (existing or uploaded)
}