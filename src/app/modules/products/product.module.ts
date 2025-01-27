import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

// Stationery Product Schema
const productsSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: (value: number) => value >= 0,
      message: 'Price must be a non-negative number',
    },
  },
  category: {
    type: String,
    enum: {
      values: [
        'Books',
        'Art and Craft',
        'Stationery',
        'Classroom Supplies',
      ],
    },
    required: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  photo: {
    type: String,
    required: [true, 'Photo is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: (value: number) => value >= 0,
      message: 'Price must be a non-negative number',
    },
  },
  inStock: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: (value: number) => value >= 0,
      message: 'Price must be a non-negative number',
    },
  },
  stock: {
    type: Boolean,
    default: true,
    // required: [true, 'In Stack is required']
  }
}, 
{
  timestamps: true,
},
);

// Stationery Product Model
export const Products = model<TProduct>('Products', productsSchema);
