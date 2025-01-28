// Stationery Product Interface
export interface TProduct {
  name: string;
  brand: string;
  price: number;
  category: 'Books' | 'Art And Craft' | 'Stationery' | 'Classroom Supplies';
  description: string;
  quantity: number;
  stock?: boolean; // Optional boolean for availability
  inStock: number; // Numeric stock level
  photo: string;
}
