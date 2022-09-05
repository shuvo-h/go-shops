import db from "../../../utils/server_utils/db/db";
import CommonPropertyModel from "../../Models/CommonSchema";

export const saveCommonData = async(req,res) =>{
    switch (req.body?.property) {
        case "category":
            await db.connect()
            const categoryRes = await saveNewCategory(req.body);
            await db.disconnect()
            res.json(categoryRes)
            break;
    
        default:
            res.send("Invalid property name!")
            break;
    }
}


const saveNewCategory = async(category) =>{
    try {
        const newCategory = new CommonPropertyModel(category);
        const categorySaveRes = await newCategory.save();
        if (categorySaveRes._id) {
            return {error: false, data: categorySaveRes}
        }else{
            return {error: true, data: "Something went wrong. Please try again later!"}
        }
    } catch (error) {
        console.log(error.message);
        return {error: true, data: "Error occured in server! Please try again later."}
    }
}