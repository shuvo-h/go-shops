import db from "../../../utils/server_utils/db/db"
import ProductsModel from "../../Models/Products";

export const getProductCategoriesCtl = async(req,res) =>{
    await db.connect();
    // db.collection.distinct(field, query, options)   // field-> string, query -> filter object, option->other
    const categories = await ProductsModel.distinct("category");
    await db.disconnect();
    res.json(categories)
}