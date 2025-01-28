import AppError from "../../error/AppError"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { adminServices } from "./admin.services"

// user block controller
const userBlockController = catchAsync(async (req, res) => {
    const userId = req.params.userId

    const result = await adminServices.adminBlockUserFromDB(userId)
    if (!result) {
        throw new AppError(404, 'User not found !');
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'User blocked successfully',
    })

})
const getAllUser = catchAsync(async (req, res) => {
    const result = await adminServices.getAllUser();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User is retrieved successfully',
        data: result,
    });
});
const getAllOrderController = catchAsync(async (req, res) => {
    const result = await adminServices.getAllOrder();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order retrieved successfully',
        data: result,
    });
});
const confirmOrder = catchAsync(async (req, res) => {
    const id = req.params.orderId
    const result = await adminServices.confirmOrder(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order confirm successfully',
        data: result,
    });
});


  
export const adminController = {
    userBlockController,
    getAllUser,
    getAllOrderController,
    confirmOrder
}