import nextHandler from "next-connect";
import ShopsModel from "../../../server/Models/shopSchema";
import db from "../../../utils/server_utils/db/db";

const handler = nextHandler();

// add middleware to check header auth token here
// POST API - add a new shop
handler.get(async(req,res)=>{
    try {
        await db.connect();
        const total = await ShopsModel.find({},{_id:1}).lean();
        await db.disconnect();
        res.json({error:{status:false,message:""}, data:{total}});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:{status:true,message:error.message}, data:{}});
    }
});




export default handler;