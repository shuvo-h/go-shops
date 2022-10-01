import React from 'react';
import mainLayoutST from './mainLayout.module.css'
import HeadMainPage from '../common/HeadMain/HeadMainPage';
import SubTopNav from './SubTopNav/SubTopNav';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import Footer from './Footer/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/common/cartSlice';

const MainLayout = ({children,pageMeta,ogInfo}) => {
    const dispatch = useDispatch();
    // update cart store when component finish mount
    useEffect(()=>{
        const existingCarts = localStorage.getItem("goShop")?JSON.parse(localStorage.getItem("goShop")):[];
        if (existingCarts.length) {
            existingCarts.forEach(cart => dispatch(addToCart(cart)))
        }
        
    },[])

    return (
        <div>
            <HeadMainPage page_head_meta_info={pageMeta} ogInfo={ogInfo}></HeadMainPage>
            <div>
                <header className={`${mainLayoutST.header}`}>
                    <SubTopNav></SubTopNav>
                    <HeaderMiddle></HeaderMiddle>
                    <HeaderBottom></HeaderBottom>
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
        </div>
    );
};

export default MainLayout;

