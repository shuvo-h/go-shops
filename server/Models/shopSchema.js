import mongoose  from "mongoose";

const socialProfileLinkType = new mongoose.Schema({
    facebook: {
        type: String,
        message:"Link must be string"
    },
    twitter: {
        type: String,
        message:"Link must be string"
    },
    linkedIn: {
        type: String,
        message:"Link must be string"
    },
    youtube: {
        type: String,
        message:"Link must be string"
    },
    Instagram: {
        type: String,
        message:"Link must be string"
    },
})

const shopSchema = new mongoose.Schema(
    {
        shop_name: {
            type: String,
            required: [true, "Please provide a name for this product"], 
            trim: true, 
            unique: [true,"This shop name has already taken"],
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [100, "Name is too large."],
        },
        slug: {
            type: String,
            required: [true, "Please provide a name for this product"], 
            trim: true, 
            unique: [true, "URL must be unique"],
            minLength: [1, "URL must be at least 1 characteres."],
        },
        category:{
            type: mongoose.Types.ObjectId,
            ref:"Categories",
            required: [true, 'Category must be selected']
        },
        address:{
            road: {
                type: String,
                required: [true, "Please provide your shop location"], 
                trim: true, 
                minLength: [3, "Address must be at least 3 characteres."],
                maxLength: [100, "Address is too large."],
            },
            city: {
                type: String,
                required: [true, "Please provide the city of the shop"], 
                trim: true, 
                minLength: [3, "City must be at least 3 characteres."],
                maxLength: [100, "Address is too large."],
            },
            zip: {
                type: String,
                required: [true, "Please provide your ZIP code"], 
                trim: true, 
                minLength: [3, "ZIP code must be at least 3 characteres."],
                maxLength: [50, "Address is too large."],
            },
            state: {
                type: String,
                required: [true, "Please provide your state"], 
                trim: true, 
                minLength: [3, "State must be at least 3 characteres."],
                maxLength: [50, "State is too large."],
            },
            country: {
                type: String,
                required: [true, "Please provide your country name"], 
                trim: true, 
                minLength: [3, "Country must be at least 3 characteres."],
                maxLength: [50, "Address is too large."],
            },
            phone: {
                type: String,
                required: [true, "Please provide your phone number"], 
                trim: true, 
                minLength: [3, "Phone number must be at least 3 characteres."],
                maxLength: [15, "Number is too large."],
            },
            contact_email:{
                type: String,
                required: [true,"contact email is required"],
                trim: true,
                match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,"Invalid email address"],
                message: "Please provide a valid email address."
            },
        },
        banner: {
            type: String,
            require: [true,"Banner for the shop is required"]
        },
        brand: {
            type: String,
            require: [true,"Brand name for the shop is required"]
        },
        social_profile:{
            type: socialProfileLinkType,
        },
        opening_hours:{
            saturday: String, 
            sunday: String, 
            monday: String,
            tuesday: String,
            wednesday: String,
            thursday: String,
            friday: String
        },
        shipping_method: [String],
        store_location:{
            lat:  {
                type: Number,
                default: 0
            },
            lang: {
                type: Number,
                default: 0
            }, 
        },
        owner:{
                type: mongoose.Types.ObjectId,
                ref:"Users",
                required: [true, 'Shop must belong to an user']
        },
        review:{
            type: Number,
            default: 0,
            min: [0, "review can't be negative"],
            max: [5, "review can't be more than 5"],
        },
        description:{
            type: String,
            minLength: [50,"Description must be atleast 50 characters"],
            required:[true,"Description is required"]
        },
        shipping_policy:{
            type: String,
            minLength: [50,"Shipping policy must be atleast 50 characters"],
            required:[true,"Shipping policy is required"]
        },
        refund_policy:{
            type: String,
            minLength: [50,"Refund policy must be atleast 50 characters"],
            required:[true,"Refund policy is required"]
        },
        cancel_policy:{
            type: String,
            minLength: [50,"Cancel policy must be atleast 50 characters"],
            required:[true,"Cancel policy is required"]
        },
    },
    {
        timestamps: true
    }
)

// add default review before adding a shop
shopSchema.pre("save", async function(next){
    // add review as 0 in initially
    this.review = 0;
    next();
})
const ShopsModel = mongoose.models.Shops || mongoose.model("Shops",shopSchema);

export default ShopsModel;

