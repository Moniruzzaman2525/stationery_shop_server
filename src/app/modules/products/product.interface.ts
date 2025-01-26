// Stationery Product Interface
export interface TProduct {
  name: string;
  brand: string;
  price: number;
  category: 'Books' | 'Art And Craft' | 'Stationery' | 'Classroom Supplies'
  description: string;
  quantity: number;
  inStock?: boolean;
  photo: string;
}
