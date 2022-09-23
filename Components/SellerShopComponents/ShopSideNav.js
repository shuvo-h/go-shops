import React from 'react';
import NavLink from 'next/link';

const ShopSideNav = ({categories,shop}) => {
    return (
        <aside>
            <div>
                <h4>All Categories</h4>
                <div>
                    {
                        categories.map((ctg,idx)=> <button style={{display:"block", width:"100%", textAlign:"left", border:"none", margin:"3px auto"}} key={`ctg-${idx}`}>{ctg.category}</button>)
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
                    <u>do this when product is added in this shop</u>
                </div>
            </div>
        </aside>
    );
};

export default ShopSideNav;