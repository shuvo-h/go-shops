import nextConnect from "next-connect";
import { getCategoryByCategoryNameService } from "../../../server/API_services/categoryServices/categoryService";
import { getProductCountByShopIdsService, getProductService } from "../../../server/API_services/productServices/productService";
import { getShopReviewsByIDs } from "../../../server/API_services/reviewService/ReviewService";
import { getAllShopsService, getTopShopsService } from "../../../server/API_services/ShopServices/shopService";
const handler = nextConnect();

handler.post(async(req,res)=>{
    try {
        const {dataFor} = req.body;
        if (dataFor === "shopInfo") {
            const shopInfo = await getAllShopsService({slug:req.body?.seller_slug,limit:5});
            res.status(200).json(shopInfo);
        }else if (dataFor === 'shopreviews') {
            // const shopreviews = await getShopReviewsByIDs(shopInfo.data[0].reviews);
            const shopreviews = await getShopReviewsByIDs(req.body.reviews);
            res.status(200).json(shopreviews);
        }else if (dataFor === "products") {
            const products = await getProductService(req.body?.productFilterOption);
            res.status(200).json(products);
        }else if (dataFor === "topSoldProducts") {
            const topSoldProducts = await getProductService(req.body?.topProductsFIlter)
            res.status(200).json(topSoldProducts);
        }else if (dataFor === "productShopInfo") {
            const shopInfo = await getAllShopsService(req.body?.productShopFilter);
            res.status(200).json(shopInfo);
        } else if (dataFor === "categoryByCtgName") {
            const caregory = await getCategoryByCategoryNameService(req.body?.category);
            res.status(200).json(caregory);
        } else if (dataFor === "productIdByShopIdList") {
            const totalProductInShop = await getProductCountByShopIdsService(req.body?.shopIDList);
            res.status(200).json(totalProductInShop);
        } else if (dataFor === "top3ratingSeller") {
            const top3RatingSellers = await getTopShopsService(req.body?.top3Filter?.limit,req.body?.top3Filter?.sort);
            res.status(200).json(top3RatingSellers);
            
        } else {
            res.status(200).json({ok:"API is working"});
            
        }
        
    } catch (error) {
        console.log(error);
        res.status(200).json({error:true,message:error.message});
    }
})

export default handler;