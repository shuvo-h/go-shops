import mongoose  from "mongoose";

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
        address:{
            location: {
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
                maxLength: [20, "State is too large."],
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
            facebook: String,
            twitter: String,
            linkedIn: String,
            youtube: String,
            Instagram: String,
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
        }
    },
    {
        timestamps: true
    }
)

const ShopsModel = mongoose.models.Shops || mongoose.model("Shops",shopSchema);

export default ShopsModel;

