import db from "../../../utils/server_utils/db/db";
import { calculatePaginationFields, filterNestedFormatter, filterOperatorFormatter } from "../../../utils/server_utils/queryMaker/makeQueryFilter";
import CategoryModel from "../../Models/CategorySchema";
import ProductsModel from "../../Models/Products";
// import ReviewModel from "../../Models/ReviewSchema";
import ShopsModel from "../../Models/shopSchema";
import UsersModel from "../../Models/UserSchema";


export const getAllShopsService = async(baseQuery) =>{
    // console.log(baseQuery,"  MAIN QUERY");
    // baseQuery = {city:"kolkata",price:"gte~50,lt~14",amount:"gt~100,lte~142",age:"gt~16"}
    try {
        // request come /api/shops?city=kolkata&price=gte~50,lt~14&amount=gt~100,lte~142&age=gt~16
        let filters = {...baseQuery};
        // exclude filters fields
        const excludeFields = ['page','limit','sort','fields'];
        const addressNestedKeys = ['location', 'phone','contact_email','country','state','zip','city'];
        const operatorPerformedKeys = ['review','amount','price','age'];
        [...excludeFields,...addressNestedKeys,...operatorPerformedKeys].forEach(field=> delete filters[field]);
        
        const operatorsFilter = filterOperatorFormatter(baseQuery,operatorPerformedKeys);
        const addressFilters = filterNestedFormatter(baseQuery,addressNestedKeys,"address",true);
        filters = {...filters,...addressFilters,...operatorsFilter}
        
        // arrange queries
        const queries = calculatePaginationFields(baseQuery);
        // console.log(filters,queries);
        
        // get the products now
        await db.connect();
        const shops = await ShopsModel.find(filters)
            .populate([{path:"owner",select:"first_name last_name"},{path:"category",select:"-_id category"}])
            // .populate([{path:"owner",select:"first_name last_name"},])
            .skip(queries.skip)
            .limit(queries.limit ? queries.limit : 10)
            .select(queries.fields)
            .lean()
            .sort(queries.sortBy);
        const totalShops = await ShopsModel.countDocuments(filters);
        const pages = Math.ceil(totalShops/(queries.limit ? queries.limit : 10));
        // console.log("shop found = ",shops.length);
        await db.disconnect();
        
        return {pages, count: totalShops,data:shops, error:{status:false,messages:{common:""}}};
    } catch (error) {
        console.log(error.message);
        return error;
    }
}

// get top rating shops with total products in the shop
export const getTopShopsService = async(topLimit=3,sortBy)=>{
    try {
        await db.connect();
        // const topRatingShops = await ShopsModel.find({}).lean().sort("-review_avg").limit(topLimit).select("banner brand review_avg shop_name slug");
        const topRatingShops = await ShopsModel.find({}).lean().sort(sortBy).limit(topLimit).select("banner brand review_avg shop_name slug");
        // fins the total products of these shops
        for(let singleShop of topRatingShops){
            singleShop.totalProducts = await ProductsModel.countDocuments({shop:singleShop._id}).lean();
        }
        await db.disconnect();
        
        return topRatingShops;
    } catch (error) {
        console.log(error);
        return error;
    }
}

