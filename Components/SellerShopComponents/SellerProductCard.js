import Image from 'next/image';
import React from 'react';

const SellerProductCard = ({productlist}) => {
    console.log(productlist[0]);
    return (
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
            {
                productlist.map(product=> <div style={{border:"1px solid"}} key={product._id}>
                    <div><Image src={product.img[0]} width={800} height={500} alt="Not Found"></Image></div>
                    <p>{product.title}</p>
                    <p>rev</p>
                    <h5>${product.price[0].price} <span><s>{product.price[1]?.price && `$${product.price[1]?.price}`}</s></span></h5>
                </div>)
            }
        </div>
    );
};

export default SellerProductCard;