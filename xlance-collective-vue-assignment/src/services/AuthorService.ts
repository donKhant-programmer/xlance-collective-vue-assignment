import { authors } from "@/constants/authors.constants";
import { books } from "@/constants/books.constants";
import type { Author } from "@/models/author";


export class AuthorService {
  static async getAll(): Promise<Author[]> {
    return authors.map((a) => ({
      ...a,
      catalog: books.filter((b) => b.authorId === a.id).length,
    }));
  }

  static async getById(id: number): Promise<Author | undefined> {
    return authors.find((a) => a.id === id);
  }

  static async add(author: Author & { image?: File }): Promise<void> {
    const nextId = authors.length > 0 ? authors[authors.length - 1]!.id + 1 : 1;

    const newAuthor: Author = {
      ...author,
      id: nextId,
      imageUrl: author.image instanceof File ? URL.createObjectURL(author.image) : '',
    };

    authors.push(newAuthor);
  }

  static async update(updated: Partial<Author> & { id: number; image?: File }): Promise<void> {
    const index = authors.findIndex((a) => a.id === updated.id);

    if (index !== -1) {
      const existing = authors[index];

      if (updated.image instanceof File) {
        updated.imageUrl = URL.createObjectURL(updated.image);
      }

      authors[index] = {
        ...existing,
        ...updated,
      } as Author; // ⭐ this is the key
    }
  }

  static async delete(id: number): Promise<void> {
    const index = authors.findIndex((a) => a.id === id);

    if (index !== -1) {
      authors.splice(index, 1);
    }
  }
}
