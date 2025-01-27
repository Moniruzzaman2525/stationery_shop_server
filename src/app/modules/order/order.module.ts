// import mongoose, { Schema, model } from 'mongoose';
// import { TOrder } from './orderInterface';

import mongoose, { model, Schema } from "mongoose";

// // Stationery Order Schema
// const orderSchema = new Schema<TOrder>({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//   },
//   product: {
//     type: Schema.Types.ObjectId,
//     ref: 'Stationery',
//     required: [true, 'Product Id is required'],
//   },
//   totalPrice: {
//     type: Number,
//     required: [true, 'Total price is required'],
//     min: [0, 'Total price must be a positive number'],
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'Quantity is required'],
//     min: [1, 'Quantity must be at least 1'],
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Stationery Order Quantity Schema
// orderSchema.pre('save', async function (next) {
//   try {
//     const productId = this.product;
//     const orderQuantity = this.quantity;

//     const product = await mongoose.model('Products').findById(productId);

//     if (!product) {
//       const error = new Error('Product not found');
//       error.name = 'Validation Error';
//       error.message = 'Product not found';
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       (error as any).statusCode = 404;
//       return next(error);
//     }
//     if (product.quantity < orderQuantity) {
//       const error = new Error('Insufficient stock for the product');
//       error.name = 'Validation Error';
//       error.message = 'Insufficient stock for this product';
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       (error as any).statusCode = 404;
//       return next(error);
//     }
//     product.quantity -= orderQuantity;
//     if (product.quantity === 0) {
//       product.inStock = false;
//     }
//     await product.save();
//     next();
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     next(error);
//   }
// });

// // Stationery Order Model
// export const Orders = model<TOrder>('Orders', orderSchema);



const OrderSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
    },
    totalAmount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentId: { type: String, required: true },
    paymentStatus: { type: String, required: true, enum: ['succeeded', 'failed', 'pending'] },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'AuthUser',
    },
    orderDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export const Orders = model('Orders', OrderSchema);