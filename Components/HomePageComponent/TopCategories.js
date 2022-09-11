import Image from 'next/image';
import homeST from "./homeStyle.module.css";
import React from 'react';
import Slider from "react-slick";
import NavLink from "next/link";

const topCategorySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    // slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true
};

const TopCategories = ({topCategories}) => {
    return (
        <section style={{backgroundColor:"#f8f8f8", textAlign:"center", paddingBottom:"80px"}}>
            <h2 className={homeST.topCategiryTitle}>Top Categories Of the Month</h2>
            <div className='baseContainer'>
                <Slider {...topCategorySliderSettings}>
                    {
                        topCategories?.map(category => <div  key={category._id}>
                            <div className={homeST.topCategoryCard}>
                                <div className={homeST.topCategoryCardWrap}>
                                    <Image src={category.img} alt={category.category} width={100} height={100}></Image>
                                    <div className={homeST.topCategoryCardBtn}>
                                        <div>
                                            <h4 className='m-0'>{category.category}</h4>
                                            <NavLink href={`/products?category=${category.slug}`}><a>SHOP NOW</a></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </Slider>
            </div>
        </section>
    );
};

export default TopCategories;