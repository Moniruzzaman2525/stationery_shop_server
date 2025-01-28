import Stripe from 'stripe';
import { Orders } from './order.module';
import { CartItem, OrderData, TOrder } from './orderInterface';
import { AuthUser } from '../auth/auth.model';
import { Types } from 'mongoose';

const orderProductService = async (price: number) => {
  try {
    const stripe = new Stripe('sk_test_51NYRyfKTzmdU21JYO4eHnWYq0iKcJj2rGa7b7NZ9UIY6EcGH1cendbnbh2vINcJup4WkUuNFdmqETrP10vn3djgS00FVCGzPiB', {
      apiVersion: '2022-11-15' as any,
    })
    const amount = price * 100
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return paymentIntent
  } catch (error) {
    console.error(error);
  }
};



const callbackOrder = async (
  cartData: CartItem[],
  paymentDetails: Stripe.PaymentIntent,
  userId: string
): Promise<any[]> => {
  try {
    const { id: paymentId, amount, currency, status } = paymentDetails;

    // Verify the user exists
    const user = await AuthUser.isUserExistsById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Convert user ID to ObjectId
    const userIdObject = new Types.ObjectId(user._id);

    // Process each cart item into an order
    const orders = await Promise.all(
      cartData.map(async (item) => {
        // Ensure quantity is included in the order data
        const orderData: OrderData = {
          product: new Types.ObjectId(item._id), // Convert product ID to ObjectId
          quantity: item.quantity, // Add quantity from cartData
          totalAmount: amount / 100,
          currency,
          status: 'Pending',
          paymentId,
          paymentStatus: status,
          user: userIdObject,
          orderDate: new Date(),
        };

        // Create and save the order
        const order = new Orders(orderData);
        return await order.save();
      })
    );

    return orders;
  } catch (error) {
    console.error('Error processing orders:', error);
    throw error;
  }
};


// Calculate Revenue from Orders Services
const getTotalRevenueFromDB = async () => {
  const result = await Orders.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};


const getUserOrder = async (id: string) => {
  const user = await AuthUser.isUserExistsById(id);
  const orders = await Orders.find({ user: user._id }) 
    .populate('user') 
    .populate('product'); 
  return orders;
};



export const ordersServices = {
  orderProductService,
  getTotalRevenueFromDB,
  callbackOrder,
  getUserOrder,
};
