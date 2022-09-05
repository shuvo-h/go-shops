import db from "../../../utils/server_utils/db/db";
import CommonPropertyModel from "../../Models/CommonSchema";

export const addToCommonData = async(req,res) =>{
    switch (req.body?.property) {
        case "category":
            await db.connect()
            const categoryRes = await addNewCategory(req.body);
            await db.disconnect()
            res.json(categoryRes)
            break;
    
        default:
            res.send("Invalid property name!")
            break;
    }
}


const addNewCategory = async(updateCtg) =>{
    try {
        if (updateCtg.main) {
            const updatedMain = await CommonPropertyModel.findOneAndUpdate(
                {property:"category"},
                {
                    $push:{main:updateCtg.main}
                }
            )
        }
        if (updateCtg.sub) {
            const updatedMain = await CommonPropertyModel.findOneAndUpdate(
                {property:"category"},
                {
                    $addToSet:{sub:updateCtg.sub}
                }
            )
        }
        return await CommonPropertyModel.findOne({property:"category"})
    } catch (error) {
        return {error: true, data: "Error occured in server! Please try again later."}
    }
}