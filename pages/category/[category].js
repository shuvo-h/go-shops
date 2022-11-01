import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BannerCategoryCom from "../../Components/CategoryAllPage/BannerCategoryCom"
import SimilarCategory from '../../Components/CategoryAllPage/SimilarCategory';
import SimilarSellers from '../../Components/CategoryAllPage/SimilarSellers';
import TopSellersList from '../../Components/CategoryAllPage/TopSellersList';
import NavStepShowArrow from '../../Components/common/NavLink/NavStepShowArrow';
import MainLayout from '../../Components/MainLayout/MainLayout';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
// import { getCategoryByCategoryNameService } from '../../server/API_services/categoryServices/categoryService';
// import { getProductCountByShopIdsService, getProductService } from '../../server/API_services/productServices/productService';
// import { getAllShopsService, getTopShopsService } from '../../server/API_services/ShopServices/shopService';
import { getProductCategories } from '../../utils/client_utils/productsUtils/productUtils';

const category_pageMeta = {
    title:"Category",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}

const categoryStepNavList = [
    {name:"Home", path:"/", disable:false},
    {name:"Shop", path:"/sellers", disable:false},
    {name:"Smart Watch", path:"/", disable:true},
]



const CategoryAll = ({categories,similarProductsSF,similarSellersSF,top3RatingSellersSF,top3LatestSellersSF}) => {
    const router = useRouter();
    const {category} = router.query;
    const dispatch = useDispatch();
    const [isDataLoading,setIsDataLoading] = useState(true);
    const [similarProducts,setSimilarProducts] = useState(similarProductsSF);
    const [similarSellers,setSimilarSellers] = useState(similarSellersSF);
    const [top3RatingSellers,setTop3RatingSellers] = useState(top3RatingSellersSF);
    const [top3LatestSellers,setTop3LatestSellers] = useState(top3LatestSellersSF);

    

    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

    useEffect(()=>{
        const dataServerSideFetcher = async() =>{
            try {
                setIsDataLoading(true)
                // get 3 products of this category and the list of sub categories of that products
                const productFilterOption = {main:category,limit:3,page:1,fields:"title img category"}
                const similarProductsRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "products",productFilterOption})
                });
                const similarProductsData = await similarProductsRes.json();
                setSimilarProducts(similarProductsData.data);
    
                // get category id
                const categoryInfoRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "categoryByCtgName",category})
                });
                const categoryInfoData = await categoryInfoRes.json();
                // get similar seller list of this category
                const productShopFilter = {category:categoryInfoData?._id,limit:4,page:1,fields:"shop_name slug review_avg banner brand -owner"}
                const similarSellerRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "productShopInfo",productShopFilter})
                });
                const similarSellerData = await similarSellerRes.json();
                // get number of products for each shop/seller
                const shopIDList = similarSellerData.data?.map(seller=>seller?._id);
                console.log(shopIDList);
                // process.exit()
                // get product count by shop id list
                const totalProductInShopRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "productIdByShopIdList",shopIDList})
                });
                const totalProductInShopData = await totalProductInShopRes.json();
    
                const sellerWithProductCount = similarSellerData.data?.map(seller=>{
                    const selectedShop = totalProductInShopData.find(shop=>shop.shopId === seller?._id); 
                    seller.count = selectedShop?.count;
                    seller.productImgs = selectedShop?.productImgs;
                    return seller;
                });
                setSimilarSellers(sellerWithProductCount);
    
                // top rating 3 sellers/shop
                const top3RatingSellersRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "top3ratingSeller",top3Filter:{limit:3,sort:"-review_avg"}})
                });
                const top3RatingSellersData = await top3RatingSellersRes.json();
                setTop3RatingSellers(top3RatingSellersData)
    
                // top new added 3 sellers/shop
                const top3LatestSellersRes = await fetch("/api/serverside-props/sellers_reviews",{
                    method:"POST",
                    headers:{'content-type':"application/json"},
                    body: JSON.stringify({dataFor: "top3ratingSeller",top3Filter:{limit:3,sort:"-createdAt"}})
                });
                const top3LatestSellersData = await top3LatestSellersRes.json();
                setTop3RatingSellers(top3LatestSellersData);
    
                setIsDataLoading(false)
            } catch (error) {
                console.log(error);
                setIsDataLoading(false)
            }
        }
        dataServerSideFetcher();
    },[category])

    if (isDataLoading) {
        return <p>Loading........</p>
    }
    

    return (
        <MainLayout pageMeta={category_pageMeta}>
            <section className='baseContainer'>
                <NavStepShowArrow stepsNavList={categoryStepNavList}></NavStepShowArrow>
            </section>
            <BannerCategoryCom></BannerCategoryCom>
            <section className='baseContainer'>
                <SimilarCategory similarProducts={similarProducts}></SimilarCategory>
            </section>
            <section className='baseContainer'>
                <SimilarSellers similarSellers={similarSellers}></SimilarSellers>
            </section>
            <section className='baseContainer'>
                <TopSellersList top3RatingSellers={top3RatingSellers} top3LatestSellers={top3LatestSellers}></TopSellersList>
            </section>
        </MainLayout>
    );
};

export default CategoryAll;

export const getServerSideProps = async ({req,res,query}) =>{
     // set cache to improve performance and reduce api request
     res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');
    try {
        const {category} = query;
          // get categories from self API
        const categoriesRes = await getProductCategories();
        const categories = categoriesRes.length > 0 ? categoriesRes : productStaticCategory;
       
        /*
        // get 3 products of this category and the list of sub categories of that products
        const similarProducts = await getProductService({main:category,limit:3,page:1,fields:"title img category"});
        // get category id
        const categoryInfo = await getCategoryByCategoryNameService(category);
        // get similar seller list
        const similarSellers = await getAllShopsService({category:categoryInfo._id,limit:4,page:1,fields:"shop_name slug review_avg banner brand -owner"});
        
        // get number of products for each shop/seller
        const shopIDList = similarSellers.data?.map(seller=>seller._id);

        const totalProductInShop = await getProductCountByShopIdsService(shopIDList);
        
        
        const sellerWithProductCount = similarSellers.data?.map(seller=>{
            const selectedShop = totalProductInShop.find(shop=>shop.shopId === seller._id); 
            seller.count = selectedShop?.count;
            seller.productImgs = selectedShop?.productImgs;
            return seller;
        });

        // best 3 sellers/shop
        // follow up comment answer in mongoPlayground => https://stackoverflow.com/questions/68909555/how-do-i-find-5-most-sold-products-from-a-mongodb-collection
        // top rating 3 sellers/shop
        const top3RatingSellers = await getTopShopsService(3,"-review_avg");
        // top new added 3 sellers/shop
        const top3LatestSellers = await getTopShopsService(3,"-createdAt");
        */

        return {
            props:{
                categories,
                // similarProducts: JSON.parse(JSON.stringify(similarProducts.data)),
                // similarSellers: JSON.parse(JSON.stringify(sellerWithProductCount)),
                // top3RatingSellers: JSON.parse(JSON.stringify(top3RatingSellers)),
                // top3LatestSellers: JSON.parse(JSON.stringify(top3LatestSellers)),
                similarProductsSF:[],
                similarSellersSF:[],
                top3RatingSellersSF:[],
                top3LatestSellersSF:[],
            },
        }
        
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}


    
 
    