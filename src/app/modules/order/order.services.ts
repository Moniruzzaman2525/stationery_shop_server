import Stripe from 'stripe';
import { Orders } from './order.module';
import { TOrder } from './orderInterface';

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

    console.log(paymentIntent.client_secret);
  } catch (error) {
    console.error(error); 
  }
};
// const orderProductService = async (orderData: TOrder) => {
//   const order = new Orders(orderData);
//   const result = await order.save();
//   return result;
// };

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

export const ordersServices = {
  orderProductService,
  getTotalRevenueFromDB,
};
