import React, { useEffect, useState } from 'react';
import NavLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../Components/MainLayout/MainLayout';
import SellerCards from '../../Components/SellerList/SellerCards';
import SellerFilterNav from '../../Components/SellerList/SellerFilterNav';
import { productStaticCategory } from '../../DataSetStatic/common/productCategories';
import { seller_pageMeta } from '../../DataSetStatic/sellersData/sellerPageData';
import usePagination from '../../hooks/usePagination/usePagination';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getProductCategories } from '../../utils/client_utils/productsUtils/productUtils';
import NavStepShowArrow from '../../Components/common/NavLink/NavStepShowArrow';

const stepsNavList = [
    {name:"Home", path:"/"},
    {name:"Seller", path:"/sellers"},
    {name:"Store List", path:"/", disable:true},
]

const Sellers = ({categories}) => {
    const dispatch = useDispatch();
    const {user,login_status,login_err} = useSelector(state =>state.User);
    const {displayPageNumbers,setSearchQuery, setCurrentPage,searchQuery,totalPages, queryData, totalCount,pageSize,currentPage} = usePagination("/api/shops");

    useEffect(()=>{
        dispatch(setCategoriesInHome(categories))
    },[categories?.length])

    return (
        <MainLayout pageMeta={seller_pageMeta}>
            <section className='baseContainer'>
                <NavStepShowArrow stepsNavList={stepsNavList}></NavStepShowArrow>
                <div style={{display:"grid", gridTemplateColumns:"250px 1fr", gap:"50px", margin:"50px auto"}}>
                    <SellerFilterNav categories={categories} setSelectOption={setSearchQuery} setCurrentPage={setCurrentPage} selectOption={searchQuery}></SellerFilterNav>
                    <SellerCards sellers={queryData} setSelectOption={setSearchQuery} displayPageNumbers={displayPageNumbers} totalCount={totalCount}pageSize={pageSize}currentPage={currentPage}></SellerCards>
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
  

  