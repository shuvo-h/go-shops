import React from 'react';
import aboutUsST from "../styles/about-us.module.css";
import MainLayout from '../Components/MainLayout/MainLayout';
import { aboutUsMenueList, about_us_pageMeta } from '../DataSetStatic/AboutUsPage/aboutUSdata';
import SubPageMenuList from '../Components/common/subPageMenuList/SubPageMenuList';
import CustomerServices from '../Components/AboutPageComponent/CustomerServices';
import CounterShow from '../Components/AboutPageComponent/CounterShow';
import NavLink from "next/link";
import Image from 'next/image';

const awardsStaticData = [
    {
        name:"Winner SEO MAster MAGT Smart Start Award 2018",
        logo_url:"/assest/images/pages/about_us/1.png"
    },
    {
        name:"Winner SEO MAster MAGT Smart Start Award 2018",
        logo_url:"/assest/images/pages/about_us/2.png"
    },
    {
        name:"Winner SEO MAster MAGT Smart Start Award 2018",
        logo_url:"/assest/images/pages/about_us/3.png"
    },
    {
        name:"Winner SEO MAster MAGT Smart Start Award 2018",
        logo_url:"/assest/images/pages/about_us/4.png"
    },
]

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
                <div>
                    <CounterShow></CounterShow>
                </div>
                <div>
                    <div style={{backgroundColor:"#fafafb", display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1rem"}}>
                        <div>
                            <Image src={"/assest/images/pages/about_us/3.jpg"} width={800} height={500} alt="Not Found"></Image>
                        </div>
                        <div>
                            <h1>We Boost Our Clients’ Bottom Line by Optimizing Their Growth Potential</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in. metus vulputate eu scelerisque felis. Vel pretium lectus qua . Arpis massa. Nunc id cursus metus ididunt ut labore metus vulputate episcing.</p>
                            <div style={{margin:"50px auto"}}>
                                <NavLink href="/about">
                                    <a className='btn_secondary'>Visit Our Store</a>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Awards</h1>
                        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem", textAlign:"center"}}>
                            {
                                awardsStaticData.map(award => <div key={award.name}>
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                        <Image src={award.logo_url} width={100} height={100} alt="Not Found"></Image>
                                    </div>
                                    <p>{award.name}</p>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default AboutUS;