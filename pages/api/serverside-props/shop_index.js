import nextConnect from "next-connect";
import { getProductService, getProductUniqueArrayKeysService } from "../../../server/API_services/productServices/productService";

const handler = nextConnect();

handler.post(async(req,res)=>{
    try {
        const {dataFor} = req.body;
        if (dataFor === "productVarityList") {
            const productVarityList = await getProductUniqueArrayKeysService(["varity.size","varity.color","brand"]);
            res.status(200).json(productVarityList);
        }else if (dataFor === 'productsInfo') {
            const queryProductsObj = req.body?.productQuery ?? {}
            const productsInfo = await getProductService(queryProductsObj);
            res.status(200).json(productsInfo);
        }else{
            res.status(200).json({ok:"productVarityList is needed"});
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(200).json({error:true,message:error.message});
    }
})

export default handler;