import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";



const getAllBlog = catchAsync(async (req, res) => {
    
    const query = req.query
    const result = await blogServices.getAllBlog(query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order confirm successfully',
        data: result,
    });
});
const getSingleBlog = catchAsync(async (req, res) => {


    const blogId = req.params.blogId

    const result = await blogServices.getSingleBlog(blogId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order confirm successfully',
        data: result,
    });
});

export const blogController = {
    getAllBlog, getSingleBlog
} 