//// Hero section
import {HeroService, ReadHeroService} from "../services/HeroService.js";


////create
export const HeroSection=async (req, res)=>{


    let result= await HeroService(req);
    return res.status(200).json(result)

};

//Read
export const ReadHeroSection=async (req, res)=>{


    let result= await ReadHeroService(req);
    return res.status(200).json(result)

};