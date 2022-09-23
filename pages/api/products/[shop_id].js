import nexthandler from "next-connect";
import ProductsModel from "../../../server/Models/Products";
import { schemaErrorFormatterNested } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import { calculatePaginationFields, filterNestedFormatter, filterOperatorFormatter, filterOperator_specificIdxEl_fromArrOfObj } from "../../../utils/server_utils/queryMaker/makeQueryFilter";

const handler = nexthandler();

handler.get(async(req,res)=>{
    try {
        const {shop_id} = req.query;
        let filters = {...req.query};
        // exclude filters fields
        const excludeFields = ['page','limit','sort','fields'];
        const categoryNestedKeys = ['main'];
        const operatorPerformedKeys = ['rating','reviewCount','quantity'];
        const arrayfilterWithOperatorKeys = ['price'];
        [...excludeFields,...categoryNestedKeys,...operatorPerformedKeys,...arrayfilterWithOperatorKeys].forEach(field=> delete filters[field]);
        
        const operatorsFilter = filterOperatorFormatter(req.query,operatorPerformedKeys);
        const categoryFilters = filterNestedFormatter(req.query,categoryNestedKeys,"category",true);
        const priceArrayFilter = filterOperator_specificIdxEl_fromArrOfObj(req.query,arrayfilterWithOperatorKeys,0,'price')
        filters = {...filters,...categoryFilters,...operatorsFilter,...priceArrayFilter}
        // arrange queries
        const queries = calculatePaginationFields(req.query);
        
        // get the products now
        await db.connect();
        const products = await ProductsModel.find({...filters,shop:shop_id})
            // .populate([{path:"owner",select:"first_name last_name"},{path:"category",select:"-_id category"}]) // no need to popuate any key here
            .skip(queries.skip)
            .limit(queries.limit ? queries.limit : 10)
            .select(queries.fields)
            .lean()
            .sort(queries.sortBy);
        
        const totalProductsCount = await ProductsModel.countDocuments({...filters,shop:shop_id});
        const pages = Math.ceil(totalProductsCount/(queries.limit ? queries.limit : 10));
        await db.disconnect();
        
        res.json({pages, count: totalProductsCount,data:products, error:{status:false,messages:{common:""}}});
       
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError' || error.code === 11000) {
            const errors =  schemaErrorFormatterNested(error);
            res.status(500).json({error:{status:true,message:errors}, data:{}});
        }else{
            res.status(500).json({error:{status:true,message:error.message}, data:{}});
        }
    }
})


export default handler;


