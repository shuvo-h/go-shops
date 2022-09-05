import mongoose, { mongo } from "mongoose";

const commonSchema = new mongoose.Schema(
    {
        property: {type: String},
        main: [{
            main_category: {type: String},
            icon: {type: String}
        }],
        sub: [{
            sub_category : {type: String},
            icon: {type: String}
        }],
        gender: [ String]
    },
    {
        timestamps: true
    }
)

const CommonPropertyModel = mongoose.models.CommonProperty || mongoose.model("CommonProperty",commonSchema);

export default CommonPropertyModel;

