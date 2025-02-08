
import {

        LoginService,
        registerService
} from "../services/UsersService.js";





//// Registration
export const Registration=async (req, res)=>{


        let result= await registerService(req);
        return res.status(200).json(result)

};

//// Login
export const Login = async (req, res) => {
        await LoginService(req, res);
};
