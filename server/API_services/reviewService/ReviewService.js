import db from "../../../utils/server_utils/db/db";
import ReviewModel from "../../Models/ReviewSchema";

export async function getShopReviewsByIDs(idList = []) {
    try {
        await db.connect(); 
        const reviews = await ReviewModel.find({_id:{$in:[...idList]}})
        .populate([{path:"user_id",select:"-_id first_name last_name"}]).lean().sort("-createdAt");
        await db.disconnect(); 
        return reviews;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/*
export async function addProductReview(bodyReviewData) {
    try {
        await db.connect(); 
        const newReviews = new ReviewModel(bodyReviewData);
        const review = await newReviews.save();
        await db.disconnect(); 
        return review;
    } catch (error) {
        console.log(error);
        return error;
    }
}
*/
