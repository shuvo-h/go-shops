import nexthandler from "next-connect";
import { productInsertToDB } from "../../../server/middlewares/products/productMiddleWare";
import ProductsModel from "../../../server/Models/Products";
import { makeSlugify } from "../../../utils/server_utils/common/makeHooks";
import db from "../../../utils/server_utils/db/db";

const handler = nexthandler();

handler.get(async(req,res)=>{
    await db.connect();
    console.log("got connect");
    await db.disconnect();
    res.json({l:"write code to get all products"})
})

// to search unique categories from a collection  ==>>  db.collection.distinct(field, query, options)
// request to:  http://localhost:3000/api/products   body: {title:"",ABC:"DEF",slug:"",category:"Dress",img:"",price:"654",brand:"Fatttu",countInStock:"142",description:""}

handler.post(productInsertToDB);


export default handler;