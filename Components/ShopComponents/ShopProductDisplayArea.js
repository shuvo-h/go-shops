import React from 'react';
import SellerProductCard from '../SellerShopComponents/SellerProductCard';

const ShopProductDisplayArea = ({productsInfo}) => {
    // console.log(productsInfo,"productsInfo in display area");
    return (
        <div>
            <SellerProductCard productlist={productsInfo}></SellerProductCard>
        </div>
    );
};

export default ShopProductDisplayArea;