import nextHandler from "next-connect";
import { loginUserCtl } from "../../../../server/middlewares/user/userMiddleware";
const handler = nextHandler();

// login a user
handler.post(loginUserCtl);



export default handler;