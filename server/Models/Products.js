import mongoose, { mongo } from "mongoose";

const priceSchema = new mongoose.Schema({
    price:{
        type:Number, 
        required: [true,"Price is required"],
        min:[0,"Price can't be negative"]
    },
    date: Date
})

const productSchema = new mongoose.Schema(
    {
        title:{type: String, trim: true, required: [true,"Title is required"]},
        slug:{type: String, required: true, unique: true,lowercase:true},
        category:{
            main: {type: String, required: true,lowercase:true},
            separator: [{type: String, required: false,lowercase:true}],
            sub_category: [{type: String, required: true,lowercase:true}],
            // react_icon: {type: String, required: true}
        },
        img:[{type: String, required: true}],
        // video:{type: String, required: [true,"Product Video is Required"]},
        price:{
            type: [priceSchema]
        },
        active_price:{
            type: Number,
            min: [0, "review can't be negative"],
            required: [true,"Product price is required"]
        },
        brand:{type: String, required: [true,"Brand name is required"]},
        model:{type: String, required: [true,"Model name is required"],unique:false},
        varity:[{
            price:{type: Number, required: true},
            color:{type: String, required: true,lowercase: true},
            size:{type: String, required: true,lowercase: true},
            quantity:{type: Number, required: true},
        }],
        review_avg:{
            type: Number,
            default: 0,
            min: [0, "review can't be negative"],
            max: [5, "review can't be more than 5"],
        },
        reviews:[{
            type: mongoose.Types.ObjectId,
            ref: "Reviews"
        }],
        quantity:{
            type: Number,
            required: [true,"Quantity is required"],
            min: [0, "quantity can't be negative"],
            validate: {
                validator: (value) =>{
                    // custom validate in this function, ie. use regex, chek integer, float
                    const isInteger = Number.isInteger(value);
                    return isInteger ? true : false;
                },
                message: props => `Quantity must need to be integer. Got ${props.value}`
            },
        },
        
        total_sold:{type: Number, required: true,default:0},
        shop:{
            type: mongoose.Types.ObjectId,
            ref: "Shops",
            required: [true,"Shop name for this product must be required"]
        },
        return_policy:{
            guarantee:{type: String, required: true},
            warantee:{type: String, required: true},
        },
        details:{
            description: [String],
            highlights: [String],
            special_offers: [{
                offer_name: {type: String},
                offer_details: {type: String},
            }],
        }
    },
    {
        timestamps: true
    }
)

const ProductsModel = mongoose.models.Products || mongoose.model("Products",productSchema);

export default ProductsModel;

