import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../Components/MainLayout/MainLayout';
import ShopBanner from '../../Components/SellerShopComponents/ShopBanner';
import ShopDIsplayArea from '../../Components/SellerShopComponents/ShopDIsplayArea';
import ShopSideNav from '../../Components/SellerShopComponents/ShopSideNav';
import { seller_details_pageMeta } from '../../DataSetStatic/sellersData/sellerSlug_detailsData';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getProductCategories } from '../../utils/client_utils/productsUtils/productUtils';

const SellerSingleShop = ({shop,categories,products}) => {
    console.log(shop,categories,products);
    const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCategoriesInHome(categories))
  },[categories?.length])

    return (
        <MainLayout pageMeta={{...seller_details_pageMeta, title:shop.shop_name}}>
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
        // get categories
        const categories = await getProductCategories();

        // get shop details
        const shopRes = await fetch(`${process.env.PROJECT_BASE_URI}/api/shops/shop/${params.seller_slug}`);
        const shopData = await shopRes.json();

        // get product list of this shop by ID
        const products = await fetch(`${process.env.PROJECT_BASE_URI}/api/products/${shopData.data?._id}`).then(res=>res.json());

        // console.log(shopData);
        if (!shopData.error?.status) {
            return {
                props:{shop: shopData.data,categories,products}
            }
        }else{
            return {
                redirect:{destination:"/404",permanent:false}
            }
        }
    } catch (error) {
        // console.log(error.message);
    }
    
}


