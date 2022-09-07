import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import MainLayout from '../Components/MainLayout/MainLayout'
import { productStaticCategory } from '../DataSetStatic/common/productCategories'
import { home_pageMeta } from '../DataSetStatic/HomePage/data_home'
import { setCategoriesInHome } from '../redux/slices/HomeSlice'
import styles from '../styles/Home.module.css'
import { getProductCategories } from '../utils/client_utils/productsUtils/productUtils'

export default function Home({categories}) {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCategoriesInHome(categories))
  },[categories.length])

  // keep the props in redux so canbe used from any component without sending props
  return (
    <>
      <MainLayout pageMeta={home_pageMeta}>
        <h1>Home page</h1>
      </MainLayout>
    </>
  )
}


export const getStaticProps = async(context) =>{
  // get categories from self API
  const categoriesRes = await getProductCategories();

  // get categories from static file 
  // const categories = categoriesRes.length ? categoriesRes : productCategory
  const categories = categoriesRes.length > 0 ? categoriesRes : productStaticCategory

  return{
    props:{
      categories
    },
    notFound: false,
    // revalidate: 2 * 60 * 60  // regenerate HTML for request after every 2 hours
    revalidate: 30  // regenerate HTML for request after every 2 minutes
  }
}




/*
export const getStaticPaths = async() =>{
  return {
    paths:[{params:{blogID:"1"}}]
  }
}
*/