import React from 'react';
import { vendorRecommended } from '../../DataSetStatic/HomePage/data_home';
import StarRatings from 'react-star-ratings';
import homeST from "./homeStyle.module.css";
import Image from 'next/image';
import NavBarLink from '../common/NavLink/NavLink';

const RecommendedSeller = () => {
    
    return (
        <section className={`baseContainer`} style={{margin:"50px auto"}}>
            <h2 style={{textAlign:"center"}}>Recomended Seller</h2>
            <div className={homeST.vendor_container}>
                {
                    vendorRecommended.map(vendor => <div className={homeST.vendorCard} key={vendor.brand}>
                        <div className={homeST.vendorBanner} style={{backgroundImage:`url(${vendor.banner})`}}></div>
                        <div >
                            <div className={`centerEL ${homeST.vendor_info}`}>
                                    <NavBarLink slug={vendor.slug}>
                                        <a className={homeST.vendorBrand_btn}>
                                            <Image src={vendor.brand} layout="fill" alt={vendor.vandor_name}></Image>
                                        </a>
                                    </NavBarLink>
                                <h3 className='m-0'>{vendor.vandor_name}</h3>
                                <StarRatings
                                    rating={4.3}
                                    starRatedColor="goldenrod"
                                    starEmptyColor="lightgrey"
                                    starDimension="20px"
                                    starSpacing="-0px"
                                    // changeRating={changeRatingHandler}
                                    numberOfStars={6}
                                    name='rating'
                                />
                                <p className='m-0'>{vendor.product_count} Products</p>
                            </div>

                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default RecommendedSeller;