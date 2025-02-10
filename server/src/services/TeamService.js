import TeamModel from "../models/TeamModel.js";




/////
export const  TeamCreateService=async (req,res)=>{

    try {
        let reqBody=req.body;
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
        let TeamID=req.params.TeamID;
        let reqBody=req.body;
       let data = await TeamModel.updateOne({_id:TeamID},{$set:reqBody});
        return {status:"success","Message":"Team Update successfully",data:data};
    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}


export const TeamRemoveService = async (req) => {
    try {

        let reqBody=req.body;
        let data = await TeamModel.deleteOne(reqBody);
        return {status:"success",message:"Team Remove Successfully",data:data};
    }
    catch (err) {
        return {status:"error","Message": err.toString()}
    }
}

