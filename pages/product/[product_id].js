import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../Components/MainLayout/MainLayout';
import DetailsViewArea from '../../Components/ProductPageComponents/DetailsViewArea';
import RightSideShippingMore from '../../Components/ProductPageComponents/RightSideShippingMore';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getCategoriesService } from '../../server/API_services/categoryServices/categoryService';
import { getProductService } from '../../server/API_services/productServices/productService';
import { getAllShopsService } from '../../server/API_services/ShopServices/shopService';
const productDetails_pageMeta = {
    title:"Product",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}


const ProductDetails = ({categories,product,shopInfo}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])
    

    // set page meta data for facebook og:data
    const productPageOgMetaDataInfo = {
        pageURL: encodeURI(`${process.env.PROJECT_BASE_URI}/${router.asPath}`),
        pageType:"article",
        pageImgURL: product.img?.length?product.img[0]:"",
        pageTitle: encodeURI(product.title),
        pageDescription: encodeURI(product.details?.description?.join(". ")?.substr(0,300))
    }
         
   
    
    return (
        <MainLayout pageMeta={productDetails_pageMeta} ogInfo={productPageOgMetaDataInfo}>
            <div className='baseContainer' style={{display:"grid",gridTemplateColumns:"1fr 200px"}}>
                <aside>
                    <DetailsViewArea product={product} shopInfo={shopInfo}></DetailsViewArea>
                </aside>
                <aside>
                    <RightSideShippingMore></RightSideShippingMore>
                </aside>
            </div>
        </MainLayout>
    );
};

export default ProductDetails;


export const getServerSideProps = async(context) =>{
    const {params,req,res,query} = context;
    // set cache to improve performance and reduce api request
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');


    try {
        const categories = await getCategoriesService();
        const product = await getProductService({_id:query.product_id});
        // get shop info of this product
        let shopInfo = {}
        if(product.data?.length){
            const shopInfoRes = await getAllShopsService({_id:product.data[0].shop,fields:"slug brand banner owner shop_name address reviews review_avg description -category"});
            shopInfo = shopInfoRes.data?.length? shopInfoRes.data[0]:{}
        }else{
            return {notFound:true}
        }
        // console.log(shopInfo,"shopInfo");
        return {
            // props:{shop: {},categories:[],products:{}}
            props:{
                categories:JSON.parse(JSON.stringify(categories)),
                product:JSON.parse(JSON.stringify(product.data?.length? product.data[0]:{})),
                shopInfo:JSON.parse(JSON.stringify(shopInfo)),
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}

