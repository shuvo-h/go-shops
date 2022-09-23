import React from 'react';
import layoutST from "../mainLayout.module.css";
import { getMasterCard } from '../../../utils/client_utils/svgIcons/masterCard';
import { getDoiscoverCard } from '../../../utils/client_utils/svgIcons/discoverCard';
import { getVisaCard } from '../../../utils/client_utils/svgIcons/visaCard';
import { headerMiddleData } from '../../../DataSetStatic/common/navData';
import Image from 'next/image';
import { getSVGicons, icons } from '../../../utils/client_utils/icons/getSVGIcons';
import instagramIcon from '../../../utils/client_utils/svgIcons/instagramIcon';
import { footerNavigateData } from '../../../DataSetStatic/common/footerData';
import NavLink from "next/link";

const Footer = () => {
    const {logo} = headerMiddleData;
    return (
        <div>
            <div style={{backgroundColor:"#336699"}}>
                <div className={`baseContainer centerEL ${layoutST.footer_subscrib}`}>
                    <div className={`verticalCenterEL`}>
                        {getSVGicons(icons.emailIcon,20,20)}
                        <div>
                            <h4>SUBSCRIBE TO OUR NEWSLETTER</h4>
                            <p>Get all the latest information on Events, Sales and Offers.</p>
                        </div>
                    </div>
                    <div style={{padding:"0 10px 0 25px"}}>
                        <input type="email" placeholder='Your E-mail Address' />
                    </div>
                    <div>
                        <button className={`${layoutST.subscrib_btn}`}>SUBSCRIBE</button>
                    </div>
                </div>
            </div>
            <div className={`baseContainer ${layoutST.footerMiddle}`}> 
                <div>
                    <div>
                        <Image src={logo.path} alt={logo.title} width={logo.width} height={logo.height}></Image>
                    </div>
                    <p>Got Question? Call us 24/7</p>
                    <h5>123-456-789</h5>
                    <p style={{color:"#999"}}>Register now to get updates on pronot get up icons & coupons ster now toon.</p>
                    <div>
                        {getSVGicons(icons.fbIcon,30,30)}
                        {getSVGicons(icons.twitterIcon,30,30)}
                        {getSVGicons(icons.instagramIcon,30,30)}
                        {getSVGicons(icons.youtubeIcon,30,30)}
                        {getSVGicons(icons.pinterestIcon,30,30)}
                    </div>
                </div>
                <div className={layoutST.footerLinks}>
                    <h5>{footerNavigateData.company.name}</h5>
                    {
                        footerNavigateData.company.routes.map(route => <div key={route.path}>
                            <NavLink href="/" >
                                <a>{route.title}</a>
                            </NavLink>
                      </div> )
                    }
                </div>
                <div className={layoutST.footerLinks}>
                    <h5>{footerNavigateData.myCompany.name}</h5>
                    {
                        footerNavigateData.myCompany.routes.map(route => <div key={route.path}>
                            <NavLink href="/" >
                                <a>{route.title}</a>
                            </NavLink>
                      </div> )
                    }
                </div>
                <div className={layoutST.footerLinks}>
                    <h5>{footerNavigateData.customerService.name}</h5>
                    {
                        footerNavigateData.customerService.routes.map(route => <div key={route.path}>
                            <NavLink href="/" >
                                <a>{route.title}</a>
                            </NavLink>
                      </div> )
                    }
                </div>
            </div>
            <div className={`baseContainer verticalCenterEL ${layoutST.footer_payCard}`}>
                <div>
                    <p>Copyright © 2022 GoShop Store. All Rights Reserved.</p>
                </div>
                <div>
                    <p>We&apos;re using safe payment for</p>
                </div>
                <div>
                    <span>{getSVGicons(icons.masterCard,40,40)}</span>
                    <span>{getSVGicons(icons.discoverCard,40,40)}</span>
                    <span>{getSVGicons(icons.visaCard,40,40)}</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;