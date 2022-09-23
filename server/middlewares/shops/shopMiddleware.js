import { makeSlugify } from "../../../utils/server_utils/common/makeHooks";
import { schemaErrorFormatter, schemaErrorFormatterNested } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import { calculatePaginationFields, filterAddressQueryFormatter, filterNestedFormatter, filterOperatorFormatter } from "../../../utils/server_utils/queryMaker/makeQueryFilter";
import CategoryModel from "../../Models/CategorySchema";
import ShopsModel from "../../Models/shopSchema";
import UsersModel from "../../Models/UserSchema";



export const addShopCtl = async(req,res,next) =>{
    const shop = req.body ? req.body : {};
    try {
        // add a shop from here
        // convert name to slung
        const slug = makeSlugify(shop?.shop_name);
        shop['slug'] = slug ? slug : null;
        
        // ADD IMAGE BANNER AND BRAND UPLOAD middleware

        // open DB and make schema verify and insert
        await db.connect();
        const newShopRes = await ShopsModel.create(shop);
        
        await db.disconnect();
        if (newShopRes._id) {
            res.json({data:newShopRes,error:{status:false,message:""}})
        }else{
            res.json({data:{},error:{status:true,message:"Something went wrong. please try again!"}})
        }
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors =  schemaErrorFormatterNested(error);
            res.status(500).json({error:true,message:errors, data:{}});
        }else{
            res.status(500).json({error:true,message:error.message, data:{}});
        }
    }
}


export const getAllShopsCtl = async(req,res,next) =>{
    // console.log(req.query,"  MAIN QUERY");
    
    try {
        // request come /api/shops?city=kolkata&price=gte~50,lt~14&amount=gt~100,lte~142&age=gt~16
        let filters = {...req.query};
        // exclude filters fields
        const excludeFields = ['page','limit','sort','fields'];
        const addressNestedKeys = ['location', 'phone','contact_email','country','state','zip','city'];
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
    } catch (error) {
        console.log(error.message);
        res.status(500).json({data:[], error:{status:true,messages:{common:error.message}}});
    }
}

export const gerUserSpecificShopsCtl = async(req,res,next) =>{
    // console.log(req.decodedUser,"req.decodedUser");
    try {
        const {email} = req.decodedUser;
        await db.connect();
        const shops = await ShopsModel.find({email}).lean().populate("owner",{_id:0,first_name:1, last_name:1});
        await db.disconnect();
        res.json(shops);
    } catch (error) {
        res.status(500).json({error:true,message:error.message, data:{}});
    }
    
}

export const getShopByIDCtl = async(req,res,next) =>{
    const {shop_slug} = req.query;
    
    try {
        await db.connect();
        const shop = await ShopsModel.findOne({slug:shop_slug}).lean();
        await db.disconnect();
        res.json({error:{status:false,message:""}, data:shop});
    } catch (error) {
        console.log(error);
        if (error.name === "CastError") {
            res.status(500).json({error:{status:true,message:"Need a valid shop ID"}, data:{}});
        }else{
            res.status(500).json({error:{status:true,message:error.message}, data:{}});
        }
    }
}