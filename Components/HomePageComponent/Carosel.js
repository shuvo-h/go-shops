import React from 'react';
import homeST from "../../styles/Home.module.css";
import Slider from "react-slick";
import Image from 'next/image';
import NavLink from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const caroselSettings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    

};

const HomeCarosel = () => {
    return (
        <div>
            <div>
                <Slider {...caroselSettings}>
                     <div className={`${homeST.caresol_Bg} ${homeST.caresol_Bg1}`}>
                        <div className={`baseContainer verticalCenterEL ${homeST.caresol_card}`}>
                            <div>
                                <img src="/assest/images/sliders/slide11.png" alt="" />
                            </div>
                            <div style={{textAlign:"right",color:"rgb(51,51,51)"}}>
                                <p style={{fontSize:"40px", lineHeight:"25px",letterSpacing:"-3px", margin:"0"}}>Best Selling </p>
                                <h2 style={{fontSize:"50px", lineHeight:"80px", letterSpacing:"-2px", margin:"0", fontWeight:"900"}}>WEEKLY POPULAR</h2>
                                <h4 style={{fontSize:"20px",  lineHeight:"10px", margin:"0",color:"#666 "}}>Sale up to <span style={{color:"#f77c29 "}}>30% OFF</span> </h4>
                                <NavLink  href="/">
                                    <a className={homeST.carosole_btn}>SHOP NOW</a>
                                </NavLink>
                            </div>
                        </div>
                    </div> 
                   
                    <div className={`${homeST.caresol_Bg} ${homeST.caresol_Bg2}`}>
                    <div className={`baseContainer verticalCenterEL ${homeST.caresol_card}`}>
                    <div >
                    <p style={{color:"#666", fontSize:"40px", lineHeight:"25px",letterSpacing:"-3px", margin:"0"}}>Anyone <span style={{color:"#f77c29 "}}>Anywhere can</span></p>
                    <h2 style={{fontSize:"50px", lineHeight:"80px", letterSpacing:"-2px", margin:"0", fontWeight:"900"}}>Start businss</h2>
                                <h4 style={{fontSize:"20px",  lineHeight:"10px", margin:"0",color:"#666 "}}>with GoShop</h4>
                                <NavLink  href="/">
                                    <a className={homeST.carosole_btn}>SIGNUP NOW</a>
                                    </NavLink>
                                    </div>
                                    <div>
                                    <img src="/assest/images/sliders/slide22.png" alt="" />
                                    </div>
                                    </div>
                                    </div>
                                
                    
                                <div className={`${homeST.caresol_Bg} ${homeST.caresol_Bg3}`}>
                                    <div className={`baseContainer verticalCenterEL ${homeST.caresol_card}`}>
                                        <div>
                                            <img src="/assest/images/sliders/slide33.png" alt="" />
                                        </div>
                                        <div style={{textAlign:"right",color:"rgb(102,102,102)"}}>
                                            <p style={{fontSize:"40px", lineHeight:"25px",letterSpacing:"-3px", margin:"0"}}>YOUR PRODUCT </p>
                                            <h2 style={{fontSize:"50px", color:"rgb(102,102,102))", lineHeight:"80px", letterSpacing:"-2px", margin:"0", fontWeight:"900"}}>sell on trusted sites</h2>
                                            <h2 style={{fontSize:"50px", lineHeight:"80px", letterSpacing:"-2px", margin:"0", fontWeight:"900",}}> <span style={{backgroundColor:"#f77c29", borderBottom:"3px solid #f77c29"}}>Trusted</span><span style={{color:"#f77c29", borderBottom:"3px solid #f77c29"}}>-Us</span> </h2>
                                            <NavLink  href="/">
                                                <a className={homeST.carosole_btn}>SHOP NOW</a>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                </Slider>
            </div>
        </div>
    );
};

export default HomeCarosel;