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
// import { getProductService } from '../../server/API_services/productServices/productService';
// import { getAllShopsService } from '../../server/API_services/ShopServices/shopService';
const productDetails_pageMeta = {
    title:"Product",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}


const ProductDetails = ({categories,productSF,shopInfoSF}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {query} = router;
    const {product_id} = query;
    const [isDataLoading,setIsDataLoading] = useState(true);
    const [shopInfo,setShopInfo] = useState(shopInfoSF);
    const [product,setproduct] = useState(productSF);
    
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

    
    // due to vercel free plan Serverless Function Execution Timeout limitation, fetching the getServerSideProps() data here in useEffect
    // delete this useEffect and uncomment the getServerSideProps() code, if you move to premium plan of vercel 
    useEffect(()=>{
        setIsDataLoading(true)
        const serverlessFnDataFetch = async () =>{
            const productRes = await fetch("/api/serverside-props/sellers_reviews",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "products",productFilterOption:{_id:product_id}})
            });
            const productData = await productRes.json();
            setproduct(productData.data[0])

            // get shop info of this product
            let shopInfo = {}
            if (productData.data?.length) {
                const productShopFilter = {_id:productData.data[0].shop,fields:"slug brand banner owner shop_name address reviews review_avg description -category"}
                const productShopRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "productShopInfo",productShopFilter})
                });
                const productShopData = await productShopRes.json();
                shopInfo = productShopData.data?.length? productShopData.data[0]:{}
            }
            setShopInfo(shopInfo)

            setIsDataLoading(false)
        }
        serverlessFnDataFetch();
    },[product_id])

         
    if (isDataLoading) {
        return <p>Loading........</p>
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
        /*
        const product = await getProductService({_id:query.product_id});
        // get shop info of this product
        let shopInfo = {}
        if(product.data?.length){
            const shopInfoRes = await getAllShopsService({_id:product.data[0].shop,fields:"slug brand banner owner shop_name address reviews review_avg description -category"});
            shopInfo = shopInfoRes.data?.length? shopInfoRes.data[0]:{}
        }else{
            return {notFound:true}
        }
        */

        return {
            // props:{shop: {},categories:[],products:{}}
            props:{
                categories:JSON.parse(JSON.stringify(categories)),
                // product:JSON.parse(JSON.stringify(product.data?.length? product.data[0]:{})),
                // shopInfo:JSON.parse(JSON.stringify(shopInfo)),
                
                shopInfoSF: {},
                productSF: {},
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}

