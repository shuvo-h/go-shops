import nexthandler from "next-connect";
import ProductsModel from "../../../server/Models/Products";
import db from "../../../utils/server_utils/db/db";
const handler = nexthandler();

handler.post(async(req,res)=>{
    try {
        await db.connect();
        const promises = []
        req.body.forEach(cart =>{
            promises.push(ProductsModel.findOne({_id:cart.productID,"varity._id":cart.varityID}).select({title:1,"img":1,"varity.$":1}));
        })
        const cartProducts  = await Promise.all(promises);
        await db.disconnect();
        res.json({data:cartProducts,error:false})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:true,message:error.message})
    }
})



export default handler;