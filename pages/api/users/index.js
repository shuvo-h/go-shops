import nextConnect from "next-connect";
import { getFilteredVendorsCtl } from "../../../server/middlewares/user/userMiddleware";

const handler = nextConnect();

handler.get(getFilteredVendorsCtl)

export default handler;