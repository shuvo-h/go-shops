import mongoose, { mongo } from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        street: {type: String, required: [true,"Street is required"]},
        city: {type: String, required: [true,"City is required"]},
        state: {type: String, required: [true,"State is required"]},
        zip: {type: Number, required: [true,"ZIP code is required"]},
        country: {type: String, required: [true,"Country name is required"]}
    }
)

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true,"Email is required"],
            unique:[true,"Email already exist"],
            trim: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,"Invalid email address"],
            lowercase:true,
        },
        first_name: {
            type: String,
            required: [true, "Please provide your first name"], 
            trim: true, 
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [100, "Name is too large."],
        },
        last_name: {
            type: String,
            required: [true, "Please provide your last name"], 
            trim: true, 
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [100, "Name is too large."],
        },

        password: {
            type: String,
            required: [true, "Please provide a strong password"], 
            trim: true, 
            minLength: [3, "Name must be at least 3 characteres."],
            maxLength: [300, "Name is too large."],
        },
        address: {
            type: addressSchema,
            required: true
        },
        role:{
            type: String,
            required: true,
            enum:{
                values: ["user","admin","vendor"],
                message: "Role can't be {VALUE}"
            }
        }
    },
    {
        timestamps: true
    }
)

const UsersModel = mongoose.models.Users || mongoose.model("Users",userSchema);

export default UsersModel;

