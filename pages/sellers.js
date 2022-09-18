import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../Components/MainLayout/MainLayout';
import SellerCards from '../Components/SellerList/SellerCards';
import SellerFilterNav from '../Components/SellerList/SellerFilterNav';
import { productStaticCategory } from '../DataSetStatic/common/productCategories';
import { seller_pageMeta } from '../DataSetStatic/sellersData/sellerPageData';
import usePagination from '../hooks/usePagination/usePagination';
import { setCategoriesInHome } from '../redux/slices/HomeSlice';
import { getProductCategories } from '../utils/client_utils/productsUtils/productUtils';

const Sellers = ({categories}) => {
    const dispatch = useDispatch();
    const {user,login_status,login_err} = useSelector(state =>state.User);
    const {displayPageNumbers,setSearchQuery, searchQuery,totalPages, queryData, totalCount} = usePagination("/api/users");

    console.log(totalPages, queryData, totalCount);

    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

    return (
        <MainLayout pageMeta={seller_pageMeta}>
            <section className='baseContainer'>
                <div>
                    home &gt; Seller &gt; Sore List
                </div>
                <div style={{display:"grid", gridTemplateColumns:"250px 1fr", gap:"50px", margin:"50px auto"}}>
                    <SellerFilterNav categories={categories} setSelectOption={setSearchQuery} selectOption={searchQuery}></SellerFilterNav>
                    <SellerCards sellers={queryData} displayPageNumbers={displayPageNumbers}></SellerCards>
                </div>
            </section>
        </MainLayout>
    );
};

export default Sellers;



export const getStaticProps = async(context) =>{
    // get categories from self API
    const categoriesRes = await getProductCategories();
    // get categories from static file 
    const categories = categoriesRes.length > 0 ? categoriesRes : productStaticCategory;
    
  
    return{
      props:{
        categories,
      },
      notFound: false,
      // revalidate: 2 * 60 * 60  // regenerate HTML for request after every 2 hours
      revalidate: 2  // regenerate HTML for request after every 2 minutes
    }
  }
  

  