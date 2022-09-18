import { makeSlugify } from "../../../utils/server_utils/common/makeHooks";
import { schemaErrorFormatter, schemaErrorFormatterNested } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import ShopsModel from "../../Models/shopSchema";
import UsersModel from "../../Models/UserSchema";



export const addShopCtl = async(req,res,next) =>{
    const shop = req.body ? req.body : {};
    try {
        // add a shop from here
        // convert name to slung
        const slug = makeSlugify(shop?.shop_name);
        shop['slug'] = slug ? slug : null;

        // ADD IMAGE BANNER AND BRAND UPLOAD middleware


        // open DB and make schema verify and insert
        await db.connect();
        const newShop = new ShopsModel(shop);
        const newShopRes = await newShop.save();
        await db.disconnect();
        if (newShopRes._id) {
            res.json({data:newShopRes,error:{status:false,message:""}})
        }else{
            res.json({data:{},error:{status:true,message:"Something went wrong. please try again!"}})
        }
    } catch (error) {
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors = schemaErrorFormatterNested(error);
            res.status(500).json({error:true,message:errors, data:{}});
        }else{
            res.status(500).json({error:true,message:error.message, data:{}});
        }
    }
}


export const getAllShopsCtl = async(req,res,next) =>{
    try {
        db.connect();
        const shops = await ShopsModel.find({}).lean().populate("owner",{_id:0,first_name:1, last_name:1});
        db.disconnect();
        res.json(shops);
    } catch (error) {
        res.status(500).json({error:true,message:error.message, data:{}});
    }
}

export const gerUserSpecificShopsCtl = async(req,res,next) =>{
    // console.log(req.decodedUser,"req.decodedUser");
    try {
        const {email} = req.decodedUser;
        db.connect();
        const shops = await ShopsModel.find({email}).lean().populate("owner",{_id:0,first_name:1, last_name:1});
        db.disconnect();
        res.json(shops);
    } catch (error) {
        res.status(500).json({error:true,message:error.message, data:{}});
    }
    
}

