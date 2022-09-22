import React from 'react';
import { useState } from 'react';
import NavSellerSubTop, { navSubSellerTopData } from './NavSellerSubTop';
import SellerAbout from './SellerAbout';
import SellerProductCard from './SellerProductCard';
import SellerReview from './SellerReview';
import ShopPolicy from './ShopPolicy';

const ShopDIsplayArea = ({products}) => {
    const [viewNav,setViewNav] = useState(navSubSellerTopData[0].path);

    return (
        <div>
            <NavSellerSubTop setViewNav={setViewNav}></NavSellerSubTop>
            <div>
                filter view
            </div>
            <div>
                {navSubSellerTopData[0].path === viewNav ? <SellerProductCard productlist={products?.data}></SellerProductCard> :<></>}
                {navSubSellerTopData[1].path === viewNav ? <SellerAbout></SellerAbout> :<></>}
                {navSubSellerTopData[2].path === viewNav ? <ShopPolicy></ShopPolicy> :<></>}
                {navSubSellerTopData[3].path === viewNav ? <SellerReview></SellerReview> :<></>}
            </div>
            <div>Pagination</div>
        </div>
    );
};

export default ShopDIsplayArea;