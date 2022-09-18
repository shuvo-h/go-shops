import React from 'react';
import aboutUsST from "../styles/about-us.module.css";
import MainLayout from '../Components/MainLayout/MainLayout';
import { aboutUsMenueList, about_us_pageMeta } from '../DataSetStatic/AboutUsPage/aboutUSdata';
import SubPageMenuList from '../Components/common/subPageMenuList/SubPageMenuList';
import CustomerServices from '../Components/AboutPageComponent/CustomerServices';

const AboutUS = () => {
    return (
        <MainLayout pageMeta={about_us_pageMeta}>
            <div className={aboutUsST.headingContainer}>
                <h1 className={aboutUsST.heading}>About US</h1>
            </div>
            <section className={`baseContainer`}>
                <SubPageMenuList menuList={aboutUsMenueList}></SubPageMenuList>
                <div>
                    <CustomerServices></CustomerServices> 
                </div>
            </section>
        </MainLayout>
    );
};

export default AboutUS;