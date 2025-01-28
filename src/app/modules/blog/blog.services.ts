import QueryBuilder from "../../builder/QueryBuilder";
import Blogs from "./blog.modal";



const getAllBlog = async (query: Record<string, unknown>) => {
    const academicDepartmentQuery = new QueryBuilder(
        Blogs.find(),
        query,
    )
        .search(['title'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await academicDepartmentQuery.modelQuery;
    const meta = await academicDepartmentQuery.countTotal();
    return {
        meta,
        result,
    };
  
};
const getSingleBlog = async (id: string) => {
    const result = await Blogs.findById(id)
    return result
};


export const blogServices = {
    getAllBlog, getSingleBlog
}