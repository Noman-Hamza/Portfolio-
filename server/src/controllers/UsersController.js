
import {

        LoginService, LogoutService,
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

export const Logout = async (req, res) => {
        try {
                await LogoutService(req, res);
        } catch (err) {
                return res.status(500).json({ status: "error", Message: err.toString() });
        }
};
