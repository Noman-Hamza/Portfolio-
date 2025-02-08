import TeamModel from "../models/TeamModel.js";




/////
export const  TeamCreateService=async (req,res)=>{

    try {
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        reqBody.user_id=user_id;
        await TeamModel.create(reqBody)

        return {status:"success","Message":"Team Create  successfully"};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}

export const  TeamReadService=async (req,res)=>{

    try {
       let data = await TeamModel.find()
        return {status:"success","Message":"Team Read successfully",data:data};
    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}


export const  TeamUpdateService=async (req,res)=>{

    try {
        let user_id=req.headers.user_id;
        let TeamID=req.params.TeamID;
        let reqBody=req.body;
       let data = await TeamModel.updateOne({_id:TeamID,user_id:user_id},{$set:reqBody});
        return {status:"success","Message":"Team Update successfully",data:data};
    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}


export const TeamRemoveService = async (req) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.user_id=user_id;
        let data = await TeamModel.deleteOne(reqBody);
        return {status:"success",message:"Team Remove Successfully",data:data};
    }
    catch (err) {
        return {status:"error","Message": err.toString()}
    }
}

