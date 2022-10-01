import { getProductService } from "../../server/API_services/productServices/productService";
import ProductsModel from "../../server/Models/Products";


export default async function handler(req, res) {
  try {
    
    // const products = await ProductsModel.find({["category.sub_category"]:"expensive"}).select("category").lean()
    // const products = await ProductsModel.find({}).select("category").lean()
    
    const searchKeyList=['title',"details.description","details.highlights","details.special_offers.offer_name","details.special_offers.offer_details","model","brand"];
    const searchFilterCMD = searchCMDConstructor(req.query,searchKeyList)

    const productsInfo = await getProductService({
      // $or:[{title:{$regex:"full pant",$options:"ig"}},{"details.description":{$regex:"full pant",$options:"ig"}}],
      // 'category.main':"technology",
      ...searchFilterCMD,
      'fields':"title -reviews details.description"
    });
    

    
    // res.status(200).json({ name: 'John Doe' })
    res.status(200).json(productsInfo)
    
  } catch (error) {
   console.log(error.message); 
   res.send(error.message)
  }
}


const searchCMDConstructor = (mainQuery,searchKeyList=[""]) =>{
  const searchString= mainQuery.search;
  // generate search command
  const searchCMD = searchKeyList.map(keyEl=>{
    return {[keyEl]:{$regex:searchString,$options:"ig"}}
  })
  // console.log(searchCMD);
  // {$or:[{title:{$regex:"full pant",$options:"ig"}},{"details.description":{$regex:"full pant",$options:"ig"}}],}
  return {$or:searchCMD}
}

