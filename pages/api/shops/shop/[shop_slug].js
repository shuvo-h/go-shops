import nextHandler from "next-connect";
import { getShopByIDCtl } from "../../../../server/middlewares/shops/shopMiddleware";

const handler = nextHandler();


// add middleware to check header auth token here
// POST API - add a new shop
handler.get(getShopByIDCtl);



export default handler;