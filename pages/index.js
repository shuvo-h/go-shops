import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HomeCarosel from '../Components/HomePageComponent/Carosel'
import Fashion from '../Components/HomePageComponent/Fashion'
import HomeInfoCard from '../Components/HomePageComponent/HomeInfoCard'
import OnlineBusiness from '../Components/HomePageComponent/OnlineBusiness'
import OpportunityCommission from '../Components/HomePageComponent/OPportunityCommission'
import PopularCategory from '../Components/HomePageComponent/PopularCategory'
import RecommendedSeller from '../Components/HomePageComponent/RecommendedSeller'
import TopCategories from '../Components/HomePageComponent/TopCategories'
import TradeShow from '../Components/HomePageComponent/TradeShow'
import MainLayout from '../Components/MainLayout/MainLayout'
import { productStaticCategory } from '../DataSetStatic/common/productCategories'
import { home_pageMeta, topCategoriesStatic } from '../DataSetStatic/HomePage/data_home'
import { setCategoriesInHome } from '../redux/slices/HomeSlice'
import styles from '../styles/Home.module.css'
import { getProductCategories, getTopCategoriesOfMonth } from '../utils/client_utils/productsUtils/productUtils'

export default function Home({categories,topCategories}) {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCategoriesInHome(categories))
  },[categories.length])

  // keep the props in redux so canbe used from any component without sending props
  return (
    <>
      <MainLayout pageMeta={home_pageMeta}>
        <HomeCarosel></HomeCarosel>
        <HomeInfoCard></HomeInfoCard>
        <TopCategories topCategories={topCategories}></TopCategories>
        <OpportunityCommission></OpportunityCommission>
        <TradeShow></TradeShow>
        <Fashion></Fashion>
        <PopularCategory></PopularCategory>
        <OnlineBusiness></OnlineBusiness>
        <RecommendedSeller></RecommendedSeller>
      </MainLayout>
    </>
  )
}


export const getStaticProps = async(context) =>{
  console.log("ok fu");
  // get categories from self API
  const categoriesRes = await getProductCategories();
  // get categories from static file 
  const categories = categoriesRes.length > 0 ? categoriesRes : productStaticCategory;
// console.log(categoriesRes);

  // get top products of this month
  const topCategoriesRes = await getTopCategoriesOfMonth();
  const topCategories = topCategoriesRes.length > 0 ? topCategoriesRes : topCategoriesStatic;

  return{
    props:{
      categories,
      topCategories
    },
    notFound: false,
    // revalidate: 2 * 60 * 60  // regenerate HTML for request after every 2 hours
    revalidate: 2  // regenerate HTML for request after every 2 minutes
  }
}



/*
export const getStaticPaths = async() =>{
  const basePathForFS = path.join(process.cwd(),'./src/products');

  return {
    paths:[{params:{blogID:"1"}}]
  }
}
*/