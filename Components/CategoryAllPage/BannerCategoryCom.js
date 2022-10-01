import React from 'react';
import NavLink from 'next/link';

const BannerCategoryCom = () => {

    return (
        <section style={{minHeight:"300px", backgroundImage:"url(/assest/images/shop/banner2.jpg)", backgroundSize:"100% 100%"}}>
            <div className='baseContainer'>
                <div>
                    <h3>Accessories Collection</h3>
                    <h1>SMART WATCHES</h1>
                    <NavLink href={""}><a style={{color:"white", backgroundColor:"#333", padding:"15px 20px", borderRadius:"5px"}}>Discover Now</a></NavLink>
                </div>
            </div>
        </section>
    );
};

export default BannerCategoryCom;