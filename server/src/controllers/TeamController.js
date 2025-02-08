
import {TeamCreateService, TeamReadService, TeamRemoveService, TeamUpdateService} from "../services/TeamService.js";

///Create
export const TeamCreate=async (req, res)=>{


    let result= await TeamCreateService(req);
    return res.status(200).json(result)

};

///Read
export const TeamRead=async (req, res)=>{


    let result= await TeamReadService(req);
    return res.status(200).json(result)

};

///Update
export const TeamUpdate=async (req, res)=>{


    let result= await TeamUpdateService(req);
    return res.status(200).json(result)
};

///Delete
export const TeamRemove=async (req, res)=>{


    let result= await TeamRemoveService(req);
    return res.status(200).json(result)
};