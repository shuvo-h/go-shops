import db from "../../../utils/server_utils/db/db"
import CommonPropertyModel from "../../Models/CommonSchema";
import ProductsModel from "../../Models/Products";

export const getProductCategoriesCtl = async(req,res) =>{
    // db.collection.distinct(field, query, options)   // field-> string, query -> filter object, option->other
    // const categories = await ProductsModel.distinct("category");
    try {
        await db.connect();
        const categories = await CommonPropertyModel.findOne({property:"category"})
        await db.disconnect();
        res.json({data:categories,error:false,message:""})
    } catch (error) {
        console.log(error.message);
        res.json({data:{},error:false,message:"Error occured on server. Please try again later."})
    }
}



