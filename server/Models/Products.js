import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title:{type: String, trim: true, required: true},
        slug:{type: String, required: true, unique: true},
        category:{type: String, required: true},
        img:{type: String, required: true},
        price:{type: Number, required: true,default:0},
        brand:{type: String, required: true},
        // rating:{type: Number, required: true,default:0},
        // reviewCount: [{}],
        countInStock:{type: Number, required: true,default:0},
        description:{type: String, required: true},
    },
    {
        timestamps: true
    }
)

const ProductsModel = mongoose.models.Products || mongoose.model("Products",productSchema);

export default ProductsModel;

