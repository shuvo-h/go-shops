import Image from 'next/image';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

const TopSellersList = ({top3RatingSellers,top3LatestSellers}) => {
    
    
    return (
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",gap:"20px", }}>
            <div>
                <h1 style={{textAlign:"center"}}>Best Seller</h1>
                <h3><u>Do this part after completing payment checkout</u></h3>
                <p>Similar to the rest two part just DB operation will be on total sell</p>
            </div>
            <div>
                <h3 style={{textAlign:"center"}}>Top Rating Vendors</h3>
                <div>
                    {
                        top3RatingSellers.map(seller => <div style={{display:"grid", gridTemplateColumns:"1fr 2fr"}} key={seller._id}>
                            <div>
                                <Image src={seller.brand} width={80} height={80} alt={seller.shop_name}></Image>
                            </div>
                            <div>
                                <h4>{seller.shop_name}</h4>
                                <p>({seller.totalProducts} products)</p>
                                <div>
                                    <Rating  ratingValue={20 * seller.review_avg}  readonly = {true} size={25}/>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            <div>
                <h3 style={{textAlign:"center"}}>Newly Added</h3>
                <div>
                    {
                        top3LatestSellers.map(seller => <div style={{display:"grid", gridTemplateColumns:"1fr 2fr"}} key={seller._id}>
                            <div>
                                <Image src={seller.brand} width={80} height={80} alt={seller.shop_name}></Image>
                            </div>
                            <div>
                                <h4>{seller.shop_name}</h4>
                                <p>({seller.totalProducts} products)</p>
                                <div>
                                    <Rating  ratingValue={20 * seller.review_avg}  readonly = {true} size={25}/>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div>
        </div>
    );
};

export default TopSellersList;