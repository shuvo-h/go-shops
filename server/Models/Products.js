import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title:{type: String, trim: true, required: [true,"Title is required"]},
        slug:{type: String, required: true, unique: true},
        category:{
            main: {type: String, required: true},
            separator: [{type: String, required: false}],
            sub_category: [{type: String, required: true}],
            // react_icon: {type: String, required: true}
        },
        img:[{type: String, required: true}],
        price:{type: Number, required: [true,"Price is required"],min:[0,"Price can't be negative"]},
        brand:{type: String, required: [true,"Brand name is required"]},
        rating:{type: Number, required: true,default:0},
        reviewCount: {type: Number, required: true,default:0},
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
        
        description:{type: String, required: true},
        shop:{
            type: mongoose.Types.ObjectId,
            ref: "Shops",
            required: [true,"Shop name for this product must be required"]
        }
    },
    {
        timestamps: true
    }
)

const ProductsModel = mongoose.models.Products || mongoose.model("Products",productSchema);

export default ProductsModel;

