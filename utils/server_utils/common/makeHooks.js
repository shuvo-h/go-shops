import jwt from "jsonwebtoken";

export const makeSlugify = str =>str
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, '')
    ?.replace(/[\s_-]+/g, '-')
    ?.replace(/^-+|-+$/g, '');



export const generateToken = user =>{
    const payloadObj = {
        _id: user.id, 
        name:`${user.first_name} ${user.last_name}`,
        email: user.email,
        role:user.role,
        address: user.addresses
    }
    const jwt_option = {
        expiresIn: "15s"
    }
    const token = jwt.sign(payloadObj,process.env.JWT_SECRET,jwt_option);
    return token;
}
