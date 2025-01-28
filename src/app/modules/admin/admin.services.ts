import mongoose from "mongoose"
import { AuthUser } from "../auth/auth.model"
import AppError from "../../error/AppError"
import { Orders } from "../order/order.module"

// user block / un block services
const adminBlockUserFromDB  = async (id: string, action: 'block' | 'unblock') => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const user = await AuthUser.findById(id).session(session);
        if (!user || !user._id) {
            throw new AppError(404, 'User not found!');
        }
        const isBlocked = action === 'block';

        const updatedUser = await AuthUser.findByIdAndUpdate(
            id,
            { isBlocked },
            { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        return updatedUser;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(500, error.message || 'Failed to toggle user block status');
    }
};
const getAllUser = async () => {
    const result = await AuthUser.find({})
    return result;
};

const getAllOrder = async () => {
    const orders = await Orders.find({})
        .populate('user')
        .populate('product');
    return orders;
};
const confirmOrder = async (orderId: string) => {
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            orderId, 
            { status: 'Shipped' }, 
            { new: true } 
        );

        if (!updatedOrder) {
            console.error("Order not found");
            return { success: false, message: "Order not found" };
        }

        return { success: true, data: updatedOrder };
    } catch (error) {
        console.error("Error updating order status:", error);
        return { success: false, message: "Failed to update order status" };
    }
};


export const adminServices = {
    adminBlockUserFromDB, getAllUser, getAllOrder, confirmOrder
}