import mongoose, { mongo } from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category: {type: String, required: true, unique: true},
        icon: {type: String, required: true},
        sub_category: [ String],
        gender: [ String]
    },
    {
        timestamps: true
    }
)

const CategoryModel = mongoose.models.Categories || mongoose.model("Categories",categorySchema);

export default CategoryModel;

