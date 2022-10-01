import React from 'react';
import { seller_details_pageMeta } from '../../DataSetStatic/sellersData/sellerSlug_detailsData';
import MainLayout from '../MainLayout/MainLayout';
import ShopBanner from './ShopBanner';
import ShopSideNav from './ShopSideNav';
import NavLink from "next/link";
import { useRouter } from 'next/router';

export const navSubSellerTopData = [
    {name:"Products",path:""},
    {name:"About",path:"about"},
    {name:"Policies",path:"policies"},
    {name:"Reviews",path:"reviews"},
]


const SellerLayout = ({shop,categories,topSoldProducts,children}) => {
    const router = useRouter()
    
    return (
        <MainLayout pageMeta={{...seller_details_pageMeta, title:shop?.shop_name}}>
            <section className='baseContainer'>
                <section>
                     <ShopBanner shop={shop}></ShopBanner> 
                </section>
                <section style={{display:"grid", gridTemplateColumns:"250px 1fr"}}>
                    <ShopSideNav categories={categories} shop={shop} topSoldProducts={topSoldProducts}></ShopSideNav> 
                    <div>
                        <div>
                            <nav>
                                {
                                    navSubSellerTopData.map(subNav => <NavLink href={`/sellers/${shop?.slug}/${subNav.path}`} key={subNav.path}><a style={{backgroundColor:"lightgray", margin:"5px"}}>{subNav.name}</a></NavLink>)
                                }
                            </nav>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </section>
            </section>
        </MainLayout>
    );
};

export default SellerLayout;