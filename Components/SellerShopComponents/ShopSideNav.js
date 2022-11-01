import React from 'react';
import NavLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

const ShopSideNav = ({categories,shop,topSoldProducts}) => {
    const router = useRouter();
    
    return (
        <aside>
            <div>
                <h4>All Categories</h4>
                <div>
                    {
                        categories?.map((ctg,idx)=> <NavLink href={{pathname:router.pathname,query:{...router.query,main:ctg.category}}} scroll={false} shallow={false} key={`ctg-${idx}`}><a style={{display:"block", width:"100%", textAlign:"left", border:"none", margin:"3px auto"}}>{ctg.category}</a></NavLink>)
                    }
                </div>
            </div>
            <div>
                <h4>Store Coupons</h4>
                <div>
                    <button style={{border:"1px dashed", padding:"4px 8px", borderRadius:"3px"}}>First Shopping Coupon</button>
                </div>
            </div>
            <div>
                <h4>Contact Vendor</h4>
                <form>
                    <input type="text" name='' placeholder='Your Name'/>
                    <input type="text" name='email' placeholder='Your@example.com'/>
                    <textarea type="text" name='' placeholder='Type your message...'/>
                    <div>send message</div>
                </form>
            </div>
            <div>
                <h4>Store Time</h4>
                <div>
                    {
                        shop.opening_hours && Object.entries(shop.opening_hours)?.map(day=><div style={{display:"grid", gridTemplateColumns:"100px 150px"}} key={day[0]}>
                            <div>{day[0]}</div>
                            <div>{day[1]}</div>
                        </div>)
                    }
                </div>
            </div>
            <div>
                <h4>Shipping Rules</h4>
                <div>
                    {
                        shop.shipping_method?.map((method,idx)=><p style={{margin:"5px auto"}} key={`method-${idx}`}> &gt; {method}</p>)
                    }
                </div>
            </div>
            <div>
                <h4>Store Location</h4>
                <div>
                    <h1>Google Map</h1>
                </div>
            </div>
            <div>
                <h4>Best Selling</h4>
                <div>
                    {
                        topSoldProducts?.map(topProduct =><div style={{display:"grid",gridTemplateColumns:"1fr 2fr"}} key={topProduct._id}>
                            <div>
                                <Image src={topProduct.img[0]} width={80} height={80} alt="Not Found"></Image>
                            </div>
                            <div>
                                <h5 style={{margin:"0"}}>{topProduct.title}</h5>
                                <Rating  ratingValue={20 * topProduct.review_avg}  readonly = {true} size={25} />
                                <h4 style={{margin:"0"}}>${topProduct.active_price}</h4>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </aside>
    );
};

export default ShopSideNav;