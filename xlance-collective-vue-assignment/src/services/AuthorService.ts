import type { Author } from '@/models/author'

let authors: Author[] = [
  {
    id: 1,
    name: 'George R.R. Martin',
    nationality: 'American',
    genre: 'Fantasy, Sci-Fi',
    catalog: 12,
    imageUrl: ''
  },
  {
    id: 2,
    name: 'Haruki Murakami',
    nationality: 'Japanese',
    genre: 'Magical Realism',
    catalog: 14,
    imageUrl: ''
  }
]

export class AuthorService {

  static async getAll(): Promise<Author[]> {
    return authors
  }

  static async getById(id: number): Promise<Author | undefined> {
    return authors.find(a => a.id === id)
  }

  static async add(author: Author & { image?: File }): Promise<void> {
    const nextId =
      authors.length > 0 ? authors[authors.length - 1]!.id + 1 : 1
  
    const newAuthor: Author = {
      ...author,
      id: nextId,
      imageUrl:
        author.image instanceof File
          ? URL.createObjectURL(author.image)
          : '',
    }
  
    authors.push(newAuthor)
  }

  static async update(updated: Author & { image?: File }): Promise<void> {
    const index = authors.findIndex(a => a.id === updated.id)

    if (index !== -1) {

      if (updated.image instanceof File) {
        updated.imageUrl = URL.createObjectURL(updated.image)
      }

      authors[index] = { ...authors[index], ...updated }
    }
  }

  static async delete(id: number): Promise<void> {
    authors = authors.filter(a => a.id !== id)
  }
}