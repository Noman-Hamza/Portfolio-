
//// CreateBlog
import {
    BlogService, ReadAllBlogServices,
    ReadBlogByUserServices,
    RemoveBlogListService, UpdateBlogListService
} from "../services/UsersService.js";

export const CreateBlog=async (req, res)=>{


    let result= await  BlogService(req);
    return res.status(200).json(result)

};


//// ReadBlogByUser
export const ReadBlogByUser=async (req, res)=>{


    let result= await  ReadBlogByUserServices(req);
    return res.status(200).json(result)

};

//// UpdateBlog
export const UpdateBlog=async (req, res)=>{


    let result= await UpdateBlogListService(req);
    return res.status(200).json(result)

};


//// DeleteBlog
export const DeleteBlog=async (req, res)=>{


    let result= await RemoveBlogListService(req);
    return res.status(200).json(result)

};





//// ReadBlogByUser
export const ReadAllBlog=async (req, res)=>{


    let result= await  ReadAllBlogServices(req);
    return res.status(200).json(result)

};

