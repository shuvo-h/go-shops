import React from 'react';
import NavLink from 'next/link';
import Image from 'next/image';
import ShopBanner from '../SellerShopComponents/ShopBanner';
import { Rating } from 'react-simple-star-rating';

const SimilarSellers = ({similarSellers}) => {
    // console.log(similarSellers[0].productImgs);
    return (
        <div>
            <h2 style={{textAlign:"center"}}>Seller List</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)", gap:"15px"}}>
                {
                    similarSellers.map(seller =><div style={{boxShadow:"0 0 15px 1px lightgrey", padding:"10px"}} key={seller._id}>
                        <div style={{minHeight:"100px",backgroundImage:`url(${seller.banner})`, backgroundSize:"100% 100%"}}></div>
                        <div>
                            <div>
                                <Image src={seller.brand} width={80} height={80} alt="Not Found"></Image>
                            </div>
                            <div>
                                <h3>{seller.shop_name}</h3>
                                <div>
                                    <Rating  ratingValue={20 * seller.review_avg}  readonly = {true} size={25}/>
                                </div>
                                <p>{seller.count} products</p>
                                <NavLink href={{pathname:`/sellers/${seller.slug}`}}><a>Browse This Vendor</a></NavLink>
                            </div>
                            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)"}}>
                                {
                                    similarSellers[0].productImgs?.slice(0,3)?.map(img => <div key={img}>
                                        <Image src={img} width={50} height={50} alt="Not Found"></Image>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SimilarSellers;