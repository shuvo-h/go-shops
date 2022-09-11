import Image from 'next/image';
import React from 'react';
import { popularCategories } from '../../DataSetStatic/HomePage/data_home';
import NavBarLink from '../common/NavLink/NavLink';
import homeST from "./homeStyle.module.css";

const PopularCategory = () => {
    return (
        <section className='baseContainer'>
            <h2>Popular Categories</h2>
            <div className={homeST.popularCategory_wrapper}>
                {
                    popularCategories.map(category => <div className={homeST.popularCategory} key={category.primary_category.category}>
                        <div>
                            <h4>{category.primary_category.category}</h4>
                            <div className={homeST.popularSubCategory}>
                                {
                                    category.sub_categories.map(ctgTitle => <div key={ctgTitle.slung}>
                                        <NavBarLink slug={ctgTitle.slung} >
                                        <span>
                                            <span className={homeST.subCategoryArrow}> &gt; </span>
                                            <a> {ctgTitle.category}</a>
                                        </span>
                                    </NavBarLink>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className={homeST.popularCategory_banner}>
                            <Image src={category.primary_category.banner} objectFit="contain" layout='fill' alt={category.primary_category.category}></Image>
                        </div>
                    </div>)
                }
            </div>
        </section>
    );
};

export default PopularCategory;