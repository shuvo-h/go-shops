import React, { useEffect } from 'react';
import NavStepShowArrow from '../../Components/common/NavLink/NavStepShowArrow';
import MainLayout from '../../Components/MainLayout/MainLayout';
import BannerCategoryCom from "../../Components/CategoryAllPage/BannerCategoryCom"
import { useDispatch } from 'react-redux';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getCategoriesService } from '../../server/API_services/categoryServices/categoryService';
import NavSideShopFilter from '../../Components/ShopComponents/NavSideShopFilter';
import ShopProductDisplayArea from '../../Components/ShopComponents/ShopProductDisplayArea';
// import { getProductService, getProductUniqueArrayKeysService } from '../../server/API_services/productServices/productService';
import { useState } from 'react';
import { useRouter } from 'next/router';

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



const Shop = ({categories,productsInfoFS,productVarityListFS}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const {query} = router;
    const [productVarityList,setProductVarityList] = useState(productVarityListFS);
    const [productsInfo,setproductsInfo] = useState(productsInfoFS);
    const [isDataLoading,setIsDataLoading] = useState(true);

    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])


    // due to vercel free plan Serverless Function Execution Timeout limitation, fetching the getServerSideProps() data here in useEffect
    // delete this useEffect and uncomment the getServerSideProps() code, if you move to premium plan of vercel 
    useEffect(()=>{
        setIsDataLoading(true)
        const serverlessFnDataFetch = async () =>{
            const productVarityListRes = await fetch("api/serverside-props/shop_index",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "productVarityList"})
            });
            const productVarityList = await productVarityListRes.json();
            setProductVarityList(productVarityList)

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
            const productsInfoRes = await fetch("api/serverside-props/shop_index",{
                method:"POST",
                headers:{'content-type':"application/json"},
                body: JSON.stringify({dataFor: "productsInfo",productQuery})
            });
            const productsInfo = await productsInfoRes.json();
            setproductsInfo(productsInfo);
            setIsDataLoading(false)
        }
        serverlessFnDataFetch();
    },[])

   
    
    return (
        <MainLayout pageMeta={category_pageMeta}>
            <section className='baseContainer'>
                <NavStepShowArrow stepsNavList={shopStepNavList}></NavStepShowArrow>
            </section>
            <BannerCategoryCom></BannerCategoryCom>
            {
                isDataLoading 
                ?   <p>Loading........</p>
                :  <section className='baseContainer' style={{display:"grid", gridTemplateColumns:"250px 1fr"}}>
                        <aside>
                            <NavSideShopFilter categories={categories} productVarityList={productVarityList}></NavSideShopFilter>
                        </aside>
                        <aside>
                            <ShopProductDisplayArea productsInfo={productsInfo}></ShopProductDisplayArea>
                        </aside>
                    </section>
            }
            
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
        /*
        // writing this code in effect to get ride of serverless function timeout issue for free plan
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
        
        const productsInfo = await getProductService(productQuery);
        */
        return {
            props:{
                // categories:JSON.parse(JSON.stringify(categories)),
                // productsInfoFS:JSON.parse(JSON.stringify(productsInfo)),
                // productVarityListFS:JSON.parse(JSON.stringify(productVarityList)),
                categories:JSON.parse(JSON.stringify(categories)),
                productsInfoFS: {},
                productVarityListFS: {},
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true,
        };
    }
    
}

