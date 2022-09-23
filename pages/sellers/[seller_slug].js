import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../Components/MainLayout/MainLayout';
import ShopBanner from '../../Components/SellerShopComponents/ShopBanner';
import ShopDIsplayArea from '../../Components/SellerShopComponents/ShopDIsplayArea';
import ShopSideNav from '../../Components/SellerShopComponents/ShopSideNav';
import { seller_details_pageMeta } from '../../DataSetStatic/sellersData/sellerSlug_detailsData';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import CategoryModel from '../../server/Models/CategorySchema';
import ProductsModel from '../../server/Models/Products';
import ShopsModel from '../../server/Models/shopSchema';
import { getProductCategories } from '../../utils/client_utils/productsUtils/productUtils';
import db from '../../utils/server_utils/db/db';

const SellerSingleShop = ({shop,categories,products}) => {
    // console.log(shop,categories,products);
    const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCategoriesInHome(categories))
  },[categories?.length])

    return (
        <MainLayout pageMeta={{...seller_details_pageMeta, title:shop?.shop_name}}>
            <section className='baseContainer'>
                <section>
                    <ShopBanner shop={shop}></ShopBanner>
                </section>
                <section style={{display:"grid", gridTemplateColumns:"250px 1fr"}}>
                    <ShopSideNav categories={categories} shop={shop}></ShopSideNav>
                    <ShopDIsplayArea shop={shop} products={products} ></ShopDIsplayArea>
                </section>
            </section>
        </MainLayout>
    );
};

export default SellerSingleShop;

export const getServerSideProps = async(context) =>{
    const {params,req,res,query} = context;
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59')
    // set cache to improve performance and reduce api request

    try {
        // get shop details
        const {seller_slug} = params;
        await db.connect();
        const categories = await CategoryModel.find({}).lean();
        const shopData = await ShopsModel.findOne({slug:seller_slug}).lean();

        // get products with filter
        const products = await ProductsModel.find({shop: shopData._id}).lean();
        // console.log(products);
        const totalProductsCount = await ProductsModel.countDocuments({shop: shopData._id});
        const pages = Math.ceil(totalProductsCount/10);
        await db.disconnect();
        
        const productRes = {pages, count: totalProductsCount,data:products};
        return {
            props:{shop: JSON.parse(JSON.stringify(shopData)),categories:JSON.parse(JSON.stringify(categories)),products:JSON.parse(JSON.stringify(productRes))}
        }
        
        
    } catch (error) {
        console.log(error);
        return {
            props:{shop: [],categories:[],products:{}}
        }
    }
    
}


