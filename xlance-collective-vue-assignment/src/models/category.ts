export interface Category {
  id: number;
  name: string;
  description?: string;
  bookCount?: number;
  updatedAt?: string;
  iconUrl?: string; // optional, in case you want to show custom SVG/icon
  active: boolean;
}
