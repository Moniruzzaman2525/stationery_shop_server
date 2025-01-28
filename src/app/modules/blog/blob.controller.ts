import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";



const getAllBlog = catchAsync(async (req, res) => {
    
    const id = req.params.orderId
    const result = await adminServices.confirmOrder(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order confirm successfully',
        data: result,
    });
});

export const blogController = {
    getAllBlog
} 