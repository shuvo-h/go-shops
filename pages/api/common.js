import nexthandler from "next-connect";
import { addToCommonData } from "../../server/middlewares/CommonProperty/addToCommonProperty";
import { saveCommonData } from "../../server/middlewares/CommonProperty/commonProperty";

const handler = nexthandler();

handler.post(saveCommonData);

// add new info to common collection
handler.patch(addToCommonData);


export default handler;

