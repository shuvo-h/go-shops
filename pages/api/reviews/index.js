import nextHandler from "next-connect";
import { addReviewCtl } from "../../../server/middlewares/reviews/reviewsMiddleWare";
import { checkAuthLogin } from "../../../server/middlewares/user/checkAuth";

const handler = nextHandler();

/*
const sampleBody = {
        user_id:"",  // ref
        shop_id:"",  // ref
        product_id:"",  // ref
        review_date:"",
        text:"",
        ratings:{
            feature: 3.8,
            varity: 3.8,
            flexibility: 3.8,
            delivery: 3.8,
            support: 3.8,
        }
    }
*/

// add middleware to check header auth token here
// POST API - add a new shop
handler.post(checkAuthLogin,addReviewCtl);




export default handler;