import React from 'react';

const SellerAbout = ({shop}) => {
    console.log(shop);
    return (
        <div>
            <p>{shop.description}</p>
        </div>
    );
};

export default SellerAbout;