import db from "../../../utils/server_utils/db/db"
import CategoryModel from "../../Models/CategorySchema";

export const getCategoriesService = async() =>{
    try {
        await db.connect();
        const categories = await CategoryModel.find({}).lean();
        await db.disconnect();
        return categories;
    } catch (error) {
        console.log(error);
        return error
    }
}


export const getCategoryByCategoryNameService = async(categoryName) =>{
    try {
        await db.connect();
        const categoryID = await CategoryModel.findOne({category:categoryName}).lean();
        await db.disconnect();
        return categoryID;
    } catch (error) {
        console.log(error);
        return error
    }
}

