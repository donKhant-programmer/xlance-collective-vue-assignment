import type { Category } from "@/models/category";

// This is a mock service. Replace with API calls later if needed.
export const  categories: Category[] = [
    {
      id: 1,
      name: 'Fiction',
      description: 'Stories created from imagination, including novels and shorts.',
      bookCount: 124,
      updatedAt: new Date().toISOString(),
      iconUrl: '',
      active: true,
    },
    {
      id: 2,
      name: 'Biography',
      description: 'Life stories of notable people.',
      bookCount: 58,
      updatedAt: new Date().toISOString(),
      iconUrl: '',
      active: true,
    },
  ];