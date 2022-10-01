import mongoose from "mongoose";
import { schemaErrorFormatterNested } from "../../../utils/server_utils/common/schemaErrorFormattor";
import db from "../../../utils/server_utils/db/db";
import ProductsModel from "../../Models/Products";
import ReviewModel from "../../Models/ReviewSchema";
import ShopsModel from "../../Models/shopSchema";

const newReviewAvg = (ratingsObj,existingAvg,existingCount) =>{
    const newAvgRaging = (Object.entries(ratingsObj).reduce((preValue,currObj)=> preValue + parseFloat(currObj[1]),0))/5;
    // console.log(newAvgRaging,"receive",existingAvg,existingCount);
    if (existingAvg === 0) {
        existingAvg = 1;
    }
    const avgRating = ((existingAvg*(existingCount-1)) + newAvgRaging) / (existingCount + 0);  // instead of 0, it should be 1, but already inserted the new review to the review collection, so during countDocument(), this 1 is beibg added
    // console.log(avgRating,"aaaaaaaaaaaaaaaaaa",existingAvg,existingCount);
    return avgRating;
}

export async function addReviewCtl(req,res,next) {
    const {type} = req.query;
    try {
        await db.connect();
        const review = await ReviewModel.create(req.body);
        // const newReview = new ReviewModel(req.body);
        // const review = await newReview.save();
        if (type==="product") {
            // update average and review count
            const existProduct = await ProductsModel.findOne({_id:req.body.product_id}).select("-_id review_avg");
            const totalExistingReviews = await ReviewModel.countDocuments({product_id: req.body.product_id})
            // get average review and update that product
            const average = await ReviewModel.aggregate([
                {$match:{product_id: mongoose.Types.ObjectId(req.body.product_id)}},
                {$group:{
                    _id:{product_id:"$product_id",},
                    avg_exist_rating:{$avg:"$product_review",}
                }},
                {$project:{id:"$_id.product_id",avg_new:"$avg_exist_rating",_id:0}}
            ]);
            // store the review id
            const product = await ProductsModel.updateOne({_id:req.body.product_id},{$push:{reviews:review._id},$set:{review_avg:average[0].avg_new}},{upsert:true});
            res.json({data:review,error:{status:false,message:""}})

        }else if (type==="shop") {
            // update average and review count
            const existShop = await ShopsModel.findOne({_id:req.body.shop_id}).select("-_id review_avg");
            const totalExistingReviews = await ReviewModel.countDocuments({shop_id: req.body.shop_id})
            const average = newReviewAvg(req.body.ratings,existShop.review_avg,totalExistingReviews);
            console.log(average,"averag");
            // store the review id
            const shop = await ShopsModel.updateOne({_id:req.body.shop_id},{$push:{reviews:review._id},$set:{review_avg:average}},{upsert:true});
            res.json({data:review,error:{status:false,message:""}})
        }
        await db.disconnect();
        
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