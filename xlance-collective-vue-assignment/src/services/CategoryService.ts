import { books } from '@/constants/books.constants';
import { categories } from '@/constants/categories.constants';
import type { Category } from '@/models/category';

const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export class CategoryService {
  static async getAll(): Promise<Category[]> {
    await delay();

    return categories.map((cat) => ({
      ...cat,
      bookCount: books.filter((b) => b.categoryId === cat.id).length,
    }));
  }

  static async getById(id: number): Promise<Category> {
    await delay();
    const category = categories.find((c) => c.id === id);

    if (!category) throw new Error('Category not found');

    return { ...category };
  }

  static async create(category: Omit<Category, 'id' | 'updatedAt' | 'bookCount'>): Promise<void> {
    await delay();

    const newCategory: Category = {
      id: Date.now(),
      bookCount: 0,
      updatedAt: new Date().toISOString(), // real timestamp
      ...category,
    };

    categories.push(newCategory);
  }

  static async update(updated: Category): Promise<void> {
    await delay();

    const index = categories.findIndex((c) => c.id === updated.id);

    if (index === -1) throw new Error('Category not found');

    categories[index] = {
      ...categories[index],
      ...updated,
      updatedAt: new Date().toISOString(), // real timestamp
    };
  }

  static async delete(id: number): Promise<void> {
    await delay();

    const index = categories.findIndex((c) => c.id === id);

    if (index !== -1) {
      categories.splice(index, 1);
    }
  }
}
