import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    feature: {
        type: Number,
        min:[0,"Star should be positive"],
        max:[5,"Star shouldmaximum 5"],
    },
    varity: {
        type: Number,
        min:[0,"Star should be positive"],
        max:[5,"Star shouldmaximum 5"],
    },
    flexibility: {
        type: Number,
        min:[0,"Star should be positive"],
        max:[5,"Star shouldmaximum 5"],
    },
    delivery: {
        type: Number,
        min:[0,"Star should be positive"],
        max:[5,"Star shouldmaximum 5"],
    },
    support: {
        type: Number,
        min:[0,"Star should be positive"],
        max:[5,"Star shouldmaximum 5"],
    },
})

const reviewSchema = new mongoose.Schema(
    {
        user_id:{
            type: mongoose.Types.ObjectId,
            ref:"Users",
            required: [true,"User reference is required"]
        }, 
        shop_id:{
            type: mongoose.Types.ObjectId,
            ref:"Shops",
        },
        product_id:{
            type: mongoose.Types.ObjectId,
            ref:"Products",
        },
        product_review:{
            type: Number,
            min:[0,"Review can't be negative"],
            max:[5,"Review can't be larger than 5"],
        },
        review_date:{
            type: Date,
            required: [true,"Review_date is required"]
        },
        text:{
            type: String,
        },
        ratings:{
            type: ratingSchema,
            required: [false,"Ratings are required"]
        },
        likes:[{
            type: mongoose.Types.ObjectId,
            ref:"Users"
        }],
        unlikes:[{
            type: mongoose.Types.ObjectId,
            ref:"Users"
        }],
    },
    {
        timestamps: true
    }
)

// add date of the review
reviewSchema.pre('save',async function (next) {
    this.review_date = new Date();
    next();
})

const ReviewModel = mongoose.models.Reviews || mongoose.model("Reviews",reviewSchema);

export default ReviewModel;

