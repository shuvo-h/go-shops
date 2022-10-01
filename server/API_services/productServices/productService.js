// mainQuery = {city:"kolkata",price:"gte~50,lt~14",price:"gt~100,lte~142",quantity:"gt~16",limit=15,page:1}

import db from "../../../utils/server_utils/db/db";
import { calculatePaginationFields, filterNestedFormatter, filterOperatorFormatter, searchRegexCMDgenerator } from "../../../utils/server_utils/queryMaker/makeQueryFilter";
import ProductsModel from "../../Models/Products";
import ReviewModel from "../../Models/ReviewSchema";
import ShopsModel from "../../Models/shopSchema";
import UsersModel from "../../Models/UserSchema";

// request come /api/products?city=kolkata&price=gte~50,lt~14&amount=gt~100,lte~142&age=gt~16
export const getProductService = async(mainQuery) =>{
    
    try {

        let filters = {...mainQuery};
        // exclude filters fields
        const excludeFields = ['page','limit','sort','fields','search'];
        const categoryNestedKeys = ['main','separator','sub_category'];
        // first add product review and active price
        
        const operatorPerformedKeys = ['quantity','active_price','review_avg','total_sold'];
        [...excludeFields,...categoryNestedKeys,...operatorPerformedKeys].forEach(field=> delete filters[field]);
        
        const operatorsFilter = filterOperatorFormatter(mainQuery,operatorPerformedKeys);
        const categoryFilters = filterNestedFormatter(mainQuery,categoryNestedKeys,"category",true);
        // regex filter for search
        const productSearchKeyList=['title',"details.description","details.highlights","details.special_offers.offer_name","details.special_offers.offer_details","model","brand"];
        const searchFilters = searchRegexCMDgenerator(mainQuery,productSearchKeyList);
        filters = {...filters,...categoryFilters,...operatorsFilter,...searchFilters}
        
        
        // arrange queries
        const queries = calculatePaginationFields(mainQuery);
        // console.log(filters,queries,"IN serviceFN",mainQuery);
        
        // get the products now
        await db.connect();
        const products = await ProductsModel.find(filters)
            .populate({path:"reviews",populate:{path:"user_id",select:"first_name last_name profile_img"}})
            .sort(queries.sortBy)
            .skip(queries.skip)
            .limit(queries.limit ? queries.limit : 10)
            .select(queries.fields)
            .lean()
    
        const totalProducts = await ProductsModel.countDocuments(filters);
        const pages = Math.ceil(totalProducts/(queries.limit ? queries.limit : 10));
        // console.log("shop found = ",shops.length);
        await db.disconnect();
        return {pages, count: totalProducts,data:products, error:{status:false,messages:{common:""}}};
        
    //    res.json({pages:"first add product review and active price, Then do filter operation for products"});
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProductCountByShopIdsService = async(shopIds) =>{
    try {
        await db.connect();
        const productsCount = [];
        for(let shopId of shopIds){
            const count = await  ProductsModel.countDocuments({shop:shopId});
            // get product image list of this shop
            const first3Products = await getProductService({sort:"-createdAt",page:1,limit:4,fields:"-_id img"});
            const productImgs = first3Products.data?.map(productImg=>productImg.img?.length ? productImg.img[0]:undefined)?.filter(el=>el !== undefined)
            productsCount.push({count,shopId,productImgs})
        }
        await db.disconnect();
        return productsCount;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getProductUniqueArrayKeysService = async(keysNames) =>{
    try {
        await db.connect();
        const promises =[];
        const promiseTrakerOrderKeys =[];

        keysNames.forEach(item => {
            promises.push(ProductsModel.distinct(item.trim()));
            promiseTrakerOrderKeys.push(item);
        })
        const allDistinctPromises = await Promise.all(promises);
        const distinctList = allDistinctPromises.reduce((preObj,currArr,idx)=>{
            const keyMake = promiseTrakerOrderKeys[idx].replace(".","_");
            return {...preObj,[keyMake]:currArr}
        },{});
        // const distinctArray = await ProductsModel.distinct(keysName.trim());
        await db.disconnect();
        return distinctList;
    } catch (error) {
        console.log(error);
        return error;
    }
}

