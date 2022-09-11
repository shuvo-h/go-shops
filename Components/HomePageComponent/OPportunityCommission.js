import React from 'react';
import NavLink from "next/link";
import homeST from "./homeStyle.module.css";
import { bannerGrowBusiness, bannerNewOpportunity } from '../../DataSetStatic/HomePage/data_home';

const OpportunityCommission = () => {
    return (
        <section className={`baseContainer ${homeST.advertise_container}`}>
            <div style={{backgroundImage:`url(${bannerGrowBusiness.background})`}}>
                <p>{bannerGrowBusiness.heading_text}</p>
                <h3>{bannerGrowBusiness.Commision_text}</h3>
                <NavLink  href={bannerGrowBusiness.button_link}><a>{bannerGrowBusiness.button}</a></NavLink>
            </div>
            <div style={{backgroundImage:`url(${bannerNewOpportunity.background})`,color:"white"}}>
                <p>{bannerNewOpportunity.heading_text}</p>
                <h3>{bannerNewOpportunity.Commision_text}</h3>
                <NavLink  href={bannerNewOpportunity.button_link}><a>{bannerNewOpportunity.button}</a></NavLink>
            </div>
        </section>
    );
};

export default OpportunityCommission;