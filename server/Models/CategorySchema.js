import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category: {
            type: String, 
            lowercase: true,
            required: [true,"category is required"], 
            unique: [true,"category already exist"]
        },
        icon: {type: String, required: [true,"Icon is required"]},
        sub_category: [ {type:String,lowercase: true,}],
        separator: [ {type:String,lowercase: true,}]
    },
    {
        timestamps: true
    }
)

const CategoryModel = mongoose.models.Categories || mongoose.model("Categories",categorySchema);

export default CategoryModel;

