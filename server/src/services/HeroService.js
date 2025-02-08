//// Hero
import HeroModel from "../models/HeroModel.js";



export const HeroService=async (req, res)=>{

    try {
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        reqBody.user_id=user_id;
        await HeroModel.updateOne({user_id:user_id},{$set:reqBody},{upsert:true})
        return {status:"success","Message":"Hero Section update successfully"};

    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}

export const ReadHeroService=async (req, res)=>{

    try {
        let ProjectionStage={$project:{'introtitle':1,'title':1,'shortdes':1,"img":1,"icon":1}}
        let data = await HeroModel.aggregate([
            { $match: {} }, ProjectionStage
        ]);

        return {status:"success","Message":"Read Hero successfully",data:data};


    }catch(err){
        return {status:"error","Message": err.toString()};
    }
}


