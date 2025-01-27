import mongoose from "mongoose"
import { AuthUser } from "../auth/auth.model"
import AppError from "../../error/AppError"
import { Orders } from "../order/order.module"

// user block services
const adminBlockUserFromDB = async (id: string) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        const user = await AuthUser.findById(id)
        if (!user || !user._id) {
            throw new AppError(404, 'User not found !')
        }
        const blockUser = await AuthUser.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true, session },
        )

        await session.commitTransaction()
        await session.endSession()
        return blockUser
    } catch (error: any) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError(500, error)
    }
}
const getAllUser = async () => {
    const result = await AuthUser.find({ })

    return result;
};

const getAllOrder = async () => {
    const orders = await Orders.find({}) 
      .populate('user') 
      .populate('product'); 
    return orders;
  };

export const adminServices = {
    adminBlockUserFromDB,getAllUser, getAllOrder
}