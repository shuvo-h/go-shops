import { MongooseError } from "mongoose";
import db from "../../../utils/server_utils/db/db"
import CategoryModel from "../../Models/CategorySchema";
import ProductsModel from "../../Models/Products";

export const getProductCategoriesCtl = async(req,res) =>{
    // db.collection.distinct(field, query, options)   // field-> string, query -> filter object, option->other
    // const categories = await ProductsModel.distinct("category");
    try {
        await db.connect();
        const categories = await CategoryModel.find({})
        await db.disconnect();
        res.json({data:categories,error:false,message:""})
    } catch (error) {
        console.log(error.message);
        res.json({data:{},error:false,message:"Error occured on server. Please try again later."})
    }
}

export const addNewCategoryCtl = async(req,res) =>{
    
    try {
        await db.connect();
        const newCategory = new CategoryModel(req.body);
        const categories = await  newCategory.save();
        await db.disconnect();
        res.json({data:categories,error:false,message:""})
    } catch (error) {
        if (error.code === 11000) {
            res.json({data:{},error:false,message:  `${Object.values(error.keyValue).join(", ")} already exist` })
        }else{
            res.json({data:{},error:false,message:"Error occured on server. Please try again later."})
        }
    }
}



