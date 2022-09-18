import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PrivateRoute from '../../Components/common/privateRoute/PrivateRoute';
import MainLayout from '../../Components/MainLayout/MainLayout';
import AddProduct from '../../Components/MyAccount/Shop/AddProduct';
import AddShop from '../../Components/MyAccount/Shop/AddShop';
import { productStaticCategory } from '../../DataSetStatic/common/productCategories';
import { my_account_pageMeta } from '../../DataSetStatic/HomePage/data_my_account';
import { setCategoriesInHome } from '../../redux/slices/HomeSlice';
import { getProductCategories } from '../../utils/client_utils/productsUtils/productUtils';

const Shop = ({categories}) => {
    const dispatch = useDispatch();
    const [openShop,setOpenShop] = useState("addProduct");


    useEffect(()=>{
      dispatch(setCategoriesInHome(categories))
    },[categories.length])

    
    return (
        <MainLayout pageMeta={my_account_pageMeta}>
            <PrivateRoute>
                <div className='baseContainer'>
                    <h2>My Shop</h2>
                    <div>
                        <button onClick={()=>setOpenShop("addShop")}>add new shop</button>
                        <button onClick={()=>setOpenShop("addProduct")}>add a product</button>
                    </div>
                    <div>
                        {
                            openShop === "addShop" && <div style={{margin:"50px 10%"}}>
                                <AddShop></AddShop>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            openShop === "addProduct" && <div style={{margin:"50px 10%"}}>
                                <AddProduct></AddProduct>
                            </div>
                        }
                    </div>
                    Add products under a shop
                </div>
            </PrivateRoute>
        </MainLayout>
    );
};

export default Shop;

export const getStaticProps = async(context)=>{
    // get categories from self API
  const categoriesRes = await getProductCategories();
  const categories = categoriesRes.length > 0 ? categoriesRes : productStaticCategory;

  return{
    props:{
        categories
    },
    revalidate: 2,
    notFound: false
  }
}