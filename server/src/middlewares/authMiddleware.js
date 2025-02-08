import {DecodeToken} from "../utility/tokenUtility.js";

export default (req, res, next)=> {

    let token = req.headers['token'];
    if (!token) {
        token = req.cookies['token'];
    }
    let decodedToken = DecodeToken(token);
    if (decodedToken===null) {
        return res.status(401).send({Massage:'Unauthorized'});
    }else {
        let email = decodedToken.email;
        let user_id = decodedToken.user_id;

        ///add with header
        req.headers.email=email;
        req.headers.user_id=user_id;

        next()
        //console.log("I am a middleware");

    }


}