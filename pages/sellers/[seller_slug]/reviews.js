import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../../Components/MainLayout/MainLayout';
import SellerAbout from '../../../Components/SellerShopComponents/SellerAbout';
import SellerLayout from '../../../Components/SellerShopComponents/SellerLayout';
import SellerProductCard from '../../../Components/SellerShopComponents/SellerProductCard';
import SellerReview from '../../../Components/SellerShopComponents/SellerReview';
import ShopBanner from '../../../Components/SellerShopComponents/ShopBanner';
import ShopPolicy from '../../../Components/SellerShopComponents/ShopPolicy';
import { seller_details_pageMeta } from '../../../DataSetStatic/sellersData/sellerSlug_detailsData';
import { setCategoriesInHome } from '../../../redux/slices/HomeSlice';
import { getCategoriesService } from '../../../server/API_services/categoryServices/categoryService';
// import { getProductService } from '../../../server/API_services/productServices/productService';
// import { getShopReviewsByIDs } from '../../../server/API_services/reviewService/ReviewService';
// import { getAllShopsService } from '../../../server/API_services/ShopServices/shopService';

const Policies = ({shopInfoSF,categories,productsSF,topSoldProductsSF}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {query} = router;
    const {seller_slug} = query;
    const [isDataLoading,setIsDataLoading] = useState(true);
    const [shopInfo,setShopInfo] = useState(shopInfoSF);
    const [products,setproducts] = useState(productsSF);
    const [topSoldProducts,settopSoldProducts] = useState(topSoldProductsSF);
    console.log(topSoldProducts);
    
    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

   
    // due to vercel free plan Serverless Function Execution Timeout limitation, fetching the getServerSideProps() data here in useEffect
    // delete this useEffect and uncomment the getServerSideProps() code, if you move to premium plan of vercel 
    useEffect(()=>{
        setIsDataLoading(true)
        const serverlessFnDataFetch = async () =>{
            const shopInfoRes = await fetch("/api/serverside-props/sellers_reviews",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "shopInfo",seller_slug})
            });
            const shopInfoData = await shopInfoRes.json();

            // get reviews of this shop
            const reviews = shopInfoData?.data[0]?.reviews;
            const shopReviewsRes = await fetch("/api/serverside-props/sellers_reviews",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "shopreviews",reviews})
            });
            const shopReviewData = await shopReviewsRes.json();
            if(shopReviewData.length) shopInfoData.data[0].reviews = shopReviewData;
            setShopInfo(shopInfoData)

            // get product list of this shop
            let productsData = [];
            if (shopInfo.data?.length && shopInfo.data[0]._id) {
                const productFilterOption = {
                    ...query,
                    shop: shopInfoData.data[0]._id,
                    limit: query.limit ? query.limit : 3, 
                }
                const productsRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "products",productFilterOption})
                });
                productsData = productsRes.json();
            }
            setproducts(productsData)

            // get top sold products
            const topProductsFIlter = {shop: shopInfoData.data[0]._id,sort:"-total_sold",fields:"img title review_avg active_price total_sold",limit:3,page:1}
            const topSoldProductsRes = await fetch("/api/serverside-props/sellers_reviews",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "topSoldProducts",topProductsFIlter})
            });
            const topSoldProductsData = await topSoldProductsRes.json();
            settopSoldProducts(topSoldProductsData?.data)

            setIsDataLoading(false)
        }
        serverlessFnDataFetch();
    },[seller_slug])


    if (isDataLoading) {
        return <p>Loading........</p>
    }
    

    return (
        <SellerLayout shop={shopInfo?.data?.length? shopInfo?.data[0] : {}} categories={categories} topSoldProducts={topSoldProducts}>
            <h1>Child Componnect is Product Card in index.js</h1>
            <SellerReview  shop={shopInfo?.data?.length? shopInfo?.data[0] : {}}></SellerReview>
        </SellerLayout>
    );
};

export default Policies;

export const getServerSideProps = async(context) =>{
    const {params,req,res,query} = context;
    const {seller_slug} = params;
    // set cache to improve performance and reduce api request
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');


    try {
        const categories = await getCategoriesService();
        /*
        // writing this code in effect to get ride of serverless function timeout issue for free plan
        const shopInfo = await getAllShopsService({slug:seller_slug,limit:5});
        const shopreviews = await getShopReviewsByIDs(shopInfo.data[0].reviews);
        if(shopreviews.length) shopInfo.data[0].reviews = shopreviews;
        
        // get product list of this shop
        let products = [];
        if (shopInfo.data?.length && shopInfo.data[0]._id) {
            const productFilterOption = {
                ...query,
                shop: shopInfo.data[0]._id,
                limit: query.limit ? query.limit : 3, 
            }
            products = await getProductService(productFilterOption);
        }
        const topSoldProducts = await getProductService({shop: shopInfo.data[0]._id,sort:"-total_sold",fields:"img title review_avg active_price total_sold",limit:3,page:1})
        */
        
        return {
            // props:{shop: {},categories:[],products:{}}
            // props:{shop: JSON.parse(JSON.stringify(shopData)),categories:JSON.parse(JSON.stringify(categories)),products:JSON.parse(JSON.stringify(productRes))}
            props:{
                categories:JSON.parse(JSON.stringify(categories)),
                // shopInfo:JSON.parse(JSON.stringify(shopInfo)),
                // products:JSON.parse(JSON.stringify(products)),
                // topSoldProducts:JSON.parse(JSON.stringify(topSoldProducts.data)),

                shopInfoSF: {},
                productsSF: {},
                topSoldProductsSF: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}
