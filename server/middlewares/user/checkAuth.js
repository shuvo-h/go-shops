import jwt from "jsonwebtoken";
import { verifyToken } from "../../../utils/server_utils/common/makeHooks";
import db from "../../../utils/server_utils/db/db";
import UsersModel from "../../Models/UserSchema";

export const checkAuthLogin = async(req,res,next) =>{
    // console.log("checking auth");
    const {email,password} = req.body;
    try {
        // decode the token
        const decodedUser = await verifyToken(req.headers?.authorization?.split(" ")[1]);
        if (decodedUser.email) {
            await db.connect();
            const dbUser = await UsersModel.findOne({email:decodedUser.email},{_id:0,email:1})
            await db.disconnect();
            
            if (dbUser.email === decodedUser.email) {
                req.decodedUser = decodedUser;
                next();
            }else{
                throw new Error("Invaid Auth");
            }
        }else{
            throw new Error("Invaid Auth")
        }
    } catch (error) {
        res.status(500).json({error:true,message:error.message, data:{}});
    }
}