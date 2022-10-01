import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../../Components/MainLayout/MainLayout';
import SellerLayout from '../../../Components/SellerShopComponents/SellerLayout';
import SellerProductCard from '../../../Components/SellerShopComponents/SellerProductCard';
import ShopBanner from '../../../Components/SellerShopComponents/ShopBanner';
import { seller_details_pageMeta } from '../../../DataSetStatic/sellersData/sellerSlug_detailsData';
import { setCategoriesInHome } from '../../../redux/slices/HomeSlice';
import { getCategoriesService } from '../../../server/API_services/categoryServices/categoryService';
import { getProductService } from '../../../server/API_services/productServices/productService';
import { getAllShopsService } from '../../../server/API_services/ShopServices/shopService';

const ProductsSeller = ({shopInfo,categories,products,topSoldProducts}) => {
    // console.log(shopInfo,categories?.length,products,"shop in component");
    // console.log(products,"shop in component");
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

    return (
        <SellerLayout shop={shopInfo?.data?.length? shopInfo?.data[0] : {}} categories={categories} topSoldProducts={topSoldProducts}>
            <h1>Child Componnect is Product Card in index.js</h1>
            {/* <SellerProductCard productlist={products}  shop={shopInfo?.data?.length? shopInfo?.data[0] : {}}></SellerProductCard> */}
            <SellerProductCard productlist={products}></SellerProductCard>
        </SellerLayout>
    );
};

export default ProductsSeller;

export const getServerSideProps = async(context) =>{
    const {params,req,res,query} = context;
    const {seller_slug} = params;
    // set cache to improve performance and reduce api request
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');


    try {
        const categories = await getCategoriesService();
        const shopInfo = await getAllShopsService({slug:seller_slug,limit:5});
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
        
        
        return {
            // props:{shop: {},categories:[],products:{}}
            // props:{shop: JSON.parse(JSON.stringify(shopData)),categories:JSON.parse(JSON.stringify(categories)),products:JSON.parse(JSON.stringify(productRes))}
            props:{
                categories:JSON.parse(JSON.stringify(categories)),
                shopInfo:JSON.parse(JSON.stringify(shopInfo)),
                products:JSON.parse(JSON.stringify(products)),
                topSoldProducts:JSON.parse(JSON.stringify(topSoldProducts.data)),
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}
