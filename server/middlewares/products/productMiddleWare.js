import { makeSlugify } from "../../../utils/server_utils/common/makeHooks";
import { schemaErrorFormatterNested } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import ProductsModel from "../../Models/Products";

export const productInsertToDB = async(req,res) =>{
    try {
        await db.connect();
        // purify slug
        req.body.slug = req.body.slug ? makeSlugify(req.body?.slug) : makeSlugify(req.body?.title);
        const newProduct = new ProductsModel(req.body);
        const product = await newProduct.save();
        await db.disconnect();
        if (product._id) {
            res.json({data:newProduct,error:{status:false,message:""}})
        }else{
            res.json({data:newProduct,error:{status:true,message:"Something went wrong. please try again!"}})
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors =  schemaErrorFormatterNested(error);
            res.status(500).json({error:{status:true,message:errors}, data:{}});
        }else{
            res.status(500).json({error:{status:true,message:error.message}, data:{}});
        }
    }
}
export const getAllProductsCtl = async(req,res) =>{
    try {
        // request come /api/products?city=kolkata&price=gte~50,lt~14&amount=gt~100,lte~142&age=gt~16
        let filters = {...req.query};
        // exclude filters fields
        const excludeFields = ['page','limit','sort','fields'];
        const categoryNestedKeys = ['main'];
        // first add product review and active price
        /*
        const operatorPerformedKeys = ['review','amount','price','age'];
        [...excludeFields,...addressNestedKeys,...operatorPerformedKeys].forEach(field=> delete filters[field]);
        
        const operatorsFilter = filterOperatorFormatter(req.query,operatorPerformedKeys);
        const addressFilters = filterNestedFormatter(req.query,addressNestedKeys,"address",true);
        filters = {...filters,...addressFilters,...operatorsFilter}
        
        // arrange queries
        const queries = calculatePaginationFields(req.query);
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
        console.log("shop found = ",shops.length);
        await db.disconnect();
        res.json({pages, count: totalShops,data:shops, error:{status:false,messages:{common:""}}});
        */
       res.json({pages:"first add product review and active price, Then do filter operation for products"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({data:[], error:{status:true,messages:{common:error.message}}});
    }
}




