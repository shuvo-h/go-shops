import { generateToken } from "../../../utils/server_utils/common/makeHooks";
import { schemaErrorFormatter } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import UsersModel from "../../Models/UserSchema";

const bcrypt = require("bcrypt");

export const addNewUserCtl = async(req,res,next) =>{
    console.log(req.body,"BODY DATA");
    try {
        // check if youser is exist with the same email
        const existUser = await UsersModel.findOne({email:req.body?.email});
        if (!existUser?._id) {
            // create hash password
            const saltRound = 10;
            const hashedPassword =  req.body.password ? await bcrypt.hash(req.body.password,saltRound) : null;
            // const isValidPassword = await bcrypt.compare(req.body.password,dbUser.password);
            // make new user model
            const newUser = new UsersModel({...req.body, password:hashedPassword});
            console.log(newUser);
            // save to Db
            const newUserRes = await newUser.save();
            console.log(newUserRes);
            if (newUserRes._id) {
                delete newUserRes._doc?.password;
                res.status(200).json({error:false,message:"", data:newUserRes});
            }else{
                throw new Error("Something went wrong. Please try again!")
            }
        }else{
            throw new Error("Email already exist!");
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors = schemaErrorFormatter(error.message);
            res.status(500).json({error:true,message:errors, data:{}});
        }else{
            res.status(500).json({error:true,message:error.message, data:{}});
        }
    }
    
}



export const loginUserCtl = async(req,res,next) =>{
    // console.log(req.body,"bodu log in");
    const {email,password} = req.body;
    try {
        // get userinfo
        db.connect();
        const user = await UsersModel.findOne({email});
        db.disconnect();
        if (user && bcrypt.compareSync(password,user.password)) {
            const userTokenInfo = {
                _id: user.id, 
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role:user.role,
                address: user.address
            }
            const token = generateToken(userTokenInfo);
            const resData = {token,...userTokenInfo};
            res.status(200).json({error:false,message:"", data:resData});
        }else{
            res.status(401).json({error:true,message:"Invalid user email or password", data:{}});
        }
    } catch (error) {
        
        if (error.name === 'ValidationError' || error.code === 11000) {
            console.log("it is your:=>: ",error.name);
            const errors = schemaErrorFormatter(error.message);
            res.status(500).json({error:true,message:errors, data:{}});
        }else{
            res.status(500).json({error:true,message:error.message, data:{}});
        }
    }
    
}