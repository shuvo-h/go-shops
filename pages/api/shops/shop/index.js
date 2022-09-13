import nextHandler from "next-connect";
import { addShopCtl } from "../../../../server/middlewares/shops/shopMiddleware";

const handler = nextHandler();

/*
const sampleBody = {
    email: "abc@mail.com",
    first_name: "abc",
    last_name: "def",
    password:"5df7e1dc",
    hashed_password: "gfsdf245fds", // generated by becrypt
    addresses: {
        street: "",
        city: "",
        state: "",
        zip: 54641
    }
}
*/

// add middleware to check header auth token here
// POST API - add a new shop
handler.post(addShopCtl);




export default handler;