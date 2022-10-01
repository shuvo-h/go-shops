import Image from 'next/image';
import React from 'react';
import NavLink from 'next/link';
import { Rating } from 'react-simple-star-rating';

const ProductVendor = ({shopInfo}) => {
    // console.log(shopInfo);
    return (
        <div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
                <div><Image src={shopInfo.banner} width={400} height={400} alt="Not Found"></Image></div>
                <div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <div><Image src={shopInfo.brand} width={60} height={60} alt="Not Found"></Image></div>
                        <div>
                            <h4>{shopInfo.owner?.first_name} {shopInfo.owner?.last_name}</h4>
                            <div><Rating  ratingValue={20 * shopInfo.review_avg}  readonly = {true} size={20}/>({shopInfo.reviews?.length} Reviews)</div>
                        </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <div>Store Name: </div>
                        <div>{shopInfo.shop_name}</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <div>Address: </div>
                        <div>{shopInfo.address?.road}, {shopInfo.address?.city}-{shopInfo.address?.zip}, {shopInfo.address?.state}, {shopInfo.address?.country}</div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <div>Phone: </div>
                        <div>{shopInfo.shop_name}</div>
                    </div>
                    <div>
                        <NavLink href={{pathname:`/sellers/[seller_slug]`,query:{seller_slug:shopInfo.slug}}} passHref={true}><a style={{border:"1px solid lightgrey"}} target="_blank">Visit Store &gt;&gt;</a></NavLink>
                    </div>
                </div>
            </div>
            <div>
                <p>{shopInfo.description}</p>
            </div>
        </div>
    );
};

export default ProductVendor;