import nextHandler from "next-connect";
import { addNewUserCtl, loginUserCtl } from "../../../../server/middlewares/user/userMiddleware";

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

// POST API - register a new user
handler.post(addNewUserCtl);




export default handler;