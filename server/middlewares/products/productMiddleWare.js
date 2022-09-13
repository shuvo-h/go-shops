import { makeSlugify } from "../../../utils/server_utils/common/makeHooks";
import db from "../../../utils/server_utils/db/db";
import ProductsModel from "../../Models/Products";

export const productInsertToDB = async(req,res) =>{
    try {
        await db.connect();
        // purify slug
        req.body.slug = req.body.slug ? makeSlugify(req.body?.slug) : makeSlugify(req.body?.title);
        const newProduct = new ProductsModel(req.body);
        const product = await newProduct.save();
        db.disconnect();
        if (product._id) {
            res.json({data:newProduct,error:{status:false,message:""}})
        }else{
            res.json({data:newProduct,error:{status:true,message:"Something went wrong. please try again!"}})
        }
    } catch (error) {
        console.log(error.message);
        res.json({data:{},error:{status:true,message:error.message}})
    }
}




