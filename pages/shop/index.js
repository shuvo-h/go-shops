import React, { useEffect } from 'react';
import NavStepShowArrow from '../../Components/common/NavLink/NavStepShowArrow';
import MainLayout from '../../Components/MainLayout/MainLayout';
import BannerCategoryCom from "../../Components/CategoryAllPage/BannerCategoryCom"
import { useDispatch } from 'react-redux';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getCategoriesService } from '../../server/API_services/categoryServices/categoryService';
import NavSideShopFilter from '../../Components/ShopComponents/NavSideShopFilter';
import ShopProductDisplayArea from '../../Components/ShopComponents/ShopProductDisplayArea';
import { getProductService, getProductUniqueArrayKeysService } from '../../server/API_services/productServices/productService';

const category_pageMeta = {
    title:"Shop",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}


const shopStepNavList = [
    {name:"Home", path:"/", disable:false},
    {name:"Shop", path:"/sellers", disable:true},
]



const Shop = ({categories,productsInfo,productVarityList}) => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

    return (
        <MainLayout pageMeta={category_pageMeta}>
            <section className='baseContainer'>
                <NavStepShowArrow stepsNavList={shopStepNavList}></NavStepShowArrow>
            </section>
            <BannerCategoryCom></BannerCategoryCom>
            <section className='baseContainer' style={{display:"grid", gridTemplateColumns:"250px 1fr"}}>
                <aside>
                    <NavSideShopFilter categories={categories} productVarityList={productVarityList}></NavSideShopFilter>
                </aside>
                <aside>
                    <ShopProductDisplayArea productsInfo={productsInfo}></ShopProductDisplayArea>
                </aside>
            </section>
        </MainLayout>
    );
};

export default Shop;



export const getServerSideProps = async(context) =>{
    const {params,req,res,query} = context;
    // const {seller_slug} = params;
    // set cache to improve performance and reduce api request
    res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');


    try {
        const categories = await getCategoriesService();
        const productVarityList = await getProductUniqueArrayKeysService(["varity.size","varity.color","brand"]);
        
        // get all products
        const productQuery = {...query};
        if (productQuery.category) {
            delete productQuery.category; // delete category from productQuery and add as category.main key
            productQuery['category.main'] = query.category;
        }
        if (productQuery.price) {
            delete productQuery.price; 
            productQuery['active_price'] = query.price;
        }
        if (productQuery.size) {
            delete productQuery.size; 
            productQuery['varity.size'] = query.size;
        }
        if (productQuery.color) {
            delete productQuery.color; 
            productQuery['varity.color'] = query.color;
        }
        // console.log(productQuery,"productQuery in server props");
        const productsInfo = await getProductService(productQuery);

        // console.log(productsInfo.data.map(el=>el.title)," <=> RETURNED data");
        return {
            // props:{shop: {},categories:[],products:{}}
            props:{
                categories:JSON.parse(JSON.stringify(categories)),
                productsInfo:JSON.parse(JSON.stringify(productsInfo)),
                productVarityList:JSON.parse(JSON.stringify(productVarityList)),
                // productColors:JSON.parse(JSON.stringify(productColors)),
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}

