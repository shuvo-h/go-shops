import nextHandler from "next-connect";
import ProductsModel from "../../../server/Models/Products";
import db from "../../../utils/server_utils/db/db";

const handler = nextHandler();


handler.get(async(req,res)=>{
    try {
        await db.connect();
        const titles = await ProductsModel.find({},{_id:0,title:1}).lean();
        await db.disconnect;
        res.status(200).json({error:false,message:"",data:titles})
    } catch (error) {
        res.status(500).json({error:true,message:error.message,data:[]})
    }
})

export default handler;

