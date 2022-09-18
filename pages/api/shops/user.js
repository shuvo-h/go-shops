import nextHandler from "next-connect";
import { gerUserSpecificShopsCtl } from "../../../server/middlewares/shops/shopMiddleware";
import { checkAuthLogin } from "../../../server/middlewares/user/checkAuth";
const handler = nextHandler();

// add middleware to check header auth token here
// POST API - add a new shop
handler.get(checkAuthLogin,gerUserSpecificShopsCtl);




export default handler;