import nexthandler from "next-connect";
import { addNewCategoryCtl, getProductCategoriesCtl } from "../../../server/middlewares/products/categoriesMiddleware";

const handler = nexthandler();

// to search unique categories from a collection  ==>>  db.collection.distinct(field, query, options)
// request come http://localhost:3000/api/products/categories
handler.get(getProductCategoriesCtl);

handler.post(addNewCategoryCtl);


export default handler;

