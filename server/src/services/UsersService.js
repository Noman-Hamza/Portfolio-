import usersModel from '../models/UsersModel.js';
import BlogModel from "../models/BlogModel.js";
import {EncodeToken} from "../utility/tokenUtility.js";
import mongoose from "mongoose";
const ObjectID=mongoose.Types.ObjectId



//// Registration
export const registerService=async (req,res)=>{

    try {
        let reqBody=req.body;
        await usersModel.create(reqBody)


        return {status:"success","Message":"User Registration successfully"};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}

//// Login
// export const LoginService=async (req,res)=>{
//     try {
//         let reqBody=req.body;
//         let data=await     usersModel.findOne(reqBody)
//         if(data===null){
//             return res.status(400).json({status:"Fail","Message":"User not found"})
//         }else {
//             ///Login  Success Token Encode
//             let token = EncodeToken(data['email'],data['_id']);
//             // Cookies Option
//             let cookieOption={expires:new Date(Date.now()+ 24 * 60 * 60 * 1000), httpOnly:true}
//
//             // Set Cookies With Response
//             res.cookie('token',token,cookieOption)
//
//             return res.status(200).json({ status: "success", Message: "User Login successfully", token: token });
//         }
//     }catch(err){
//         return res.status(500).json({ status: "error", Message: err.toString() });
//     }
//
// }
export const LoginService = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await usersModel.findOne(reqBody);

        if (data === null) {
            return res.status(400).json({ status: "Fail", "Message": "User not found" });
        } else {
            // Login Success Token Encode
            let token = EncodeToken(data['email'], data['_id']);

            // Cookies Option with httpOnly: true (recommended for security)
            let cookieOption = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true,  // Set httpOnly flag to true
                secure: process.env.NODE_ENV === 'production',  // Ensure it's secure in production (using HTTPS)
                sameSite: 'strict'  // Ensures cookie is sent with same-origin requests only
            };

            // Set Cookies With Response
            res.cookie('token', token, cookieOption);

            return res.status(200).json({ status: "success", Message: "User Login successfully", token: token });
        }
    } catch (err) {
        return res.status(500).json({ status: "error", Message: err.toString() });
    }
}



//// BlogServices
export const  BlogService=async (req,res)=>{

    try {
        let reqBody=req.body;
        await BlogModel.create(reqBody)


        return {status:"success","Message":"Blog Create  successfully"};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}

// ReadBlogByUserServices
export const ReadBlogByUserServices=async (req,res)=>{

    try {
        let user_id= new ObjectID(req.headers['user_id']);
        let MatchStage={$match:{user_id:user_id}}

        let JoinWithUser={$lookup:{from:"users",localField:"user_id",foreignField:"_id",as:"user"}};

        let unwindBrandStage={$unwind:"$user"};
        let ProjectionStage={$project:{'title':1,'des':1,'img':1,'brandID':1,'user.lastName':1,"_id":1}}

        let data = await BlogModel.aggregate([
            MatchStage,
            JoinWithUser,
            unwindBrandStage,
            ProjectionStage
        ])


        return {status:"success","Message":"Read Blog successfully",data:data};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}


export const UpdateBlogListService = async (req) => {
    try {
        let BlogID=req.params.BlogID;
        let reqBody=req.body;
        await  BlogModel.updateOne({_id:BlogID},{$set:reqBody});
        return {status:"success",message:"Blog List Update Success"}
    }
    catch (err) {
        return {status:"error","Message": err.toString()}
    }
}


export const RemoveBlogListService = async (req) => {
    try {
        let reqBody=req.body;
        await BlogModel.deleteOne(reqBody);
        return {status:"success",message:"Blog List Remove Success"}
    }
    catch (err) {
        return {status:"error","Message": err.toString()}
    }
}






// ReadBlogByBlogIDServices
export const ReadAllBlogServices=async (req,res)=>{

    try {

        let ProjectionStage={$project:{'title':1,'des':1,'img':1,"_id":1}}
        let data = await BlogModel.aggregate([
            { $match: {} }, ProjectionStage
        ]);


        return {status:"success","Message":"Read Blog successfully",data:data};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}
