import { generateToken } from "../../../utils/server_utils/common/makeHooks";
import { schemaErrorFormatter } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import { filterAddressQueryFormatter } from "../../../utils/server_utils/queryMaker/makeQueryFilter";
import UsersModel from "../../Models/UserSchema";

const bcrypt = require("bcrypt");

export const addNewUserCtl = async(req,res,next) =>{
    // console.log(req.body,"BODY DATA");
    try {
        // check if youser is exist with the same email
        const existUser = await UsersModel.findOne({email:req.body?.email});
        if (!existUser?._id) {
            // create hash password
            const saltRound = 10;
            const hashedPassword =  req.body.password ? await bcrypt.hash(req.body.password,saltRound) : null;
            
            // make new user model
            const newUser = new UsersModel({...req.body, password:hashedPassword});
            
            // save to Db
            const newUserRes = await newUser.save();
            
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

export const getFilteredVendorsCtl = async(req,res,next) =>{
    const queryList = req.query;
    console.log(queryList);
    // make pagination data
    const page = queryList.page ? queryList.page : 0;
    const count = queryList.count ? queryList.count : 10;
    // delete page & count property to make query option
    delete queryList.page;
    delete queryList.count;
    const addressQuery = filterAddressQueryFormatter(queryList);
    
    try {
        // get userinfo
        db.connect();
        const users = await UsersModel.find(addressQuery).skip(page*count).limit(count);
        const totalUsers = await UsersModel.find(addressQuery).count();
        db.disconnect();
        res.status(200).json({error:false,message:"", count:totalUsers,data:users});
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