import React from 'react';
import { useState } from 'react';
import NavSellerSubTop, { navSubSellerTopData } from './NavSellerSubTop';
import SellerAbout from './SellerAbout';
import SellerProductCard from './SellerProductCard';
import SellerReview from './SellerReview';
import ShopPolicy from './ShopPolicy';

const ShopDIsplayArea = ({shop,products}) => {
    const [viewNav,setViewNav] = useState(navSubSellerTopData[0].path);

    
    return (
        <div>
            <NavSellerSubTop setViewNav={setViewNav}></NavSellerSubTop>
            <div>
                filter view
            </div>
            <div>
                {navSubSellerTopData[0].path === viewNav ? <SellerProductCard productlist={products}></SellerProductCard> :<></>}
                {navSubSellerTopData[1].path === viewNav ? <SellerAbout  shop={shop}></SellerAbout> :<></>}
                {navSubSellerTopData[2].path === viewNav ? <ShopPolicy shop={shop}></ShopPolicy> :<></>}
                {navSubSellerTopData[3].path === viewNav ? <SellerReview shop={shop}></SellerReview> :<></>}
            </div>
        </div>
    );
};

export default ShopDIsplayArea;