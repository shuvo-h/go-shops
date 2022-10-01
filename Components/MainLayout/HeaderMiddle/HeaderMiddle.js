import Image from 'next/image';
import React from 'react';
import { headerMiddleData } from '../../../DataSetStatic/common/navData';
import STmainLayout from "../mainLayout.module.css";
import NavLink from "next/link"

import NavSearch from './NavSearch';
import { getSVGicons, icons } from '../../../utils/client_utils/icons/getSVGIcons';
import { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import { useSelector } from 'react-redux';

const HeaderMiddle = () => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const {logo,productCategories,contact,buttonTitles} = headerMiddleData;
    const cart = useSelector(state=>state.Cart.cart);
    // console.log(cart.length);
    return (
        <div className={STmainLayout.middleNave_Container}>
            <div>
                {isCartOpen && <ShoppingCart setIsCartOpen={setIsCartOpen}></ShoppingCart>}
            </div>
            <div className={`baseContainer ${STmainLayout.middleNave_wrapper}`}>
                <div>
                    <Image src={logo.path} alt={logo.title} width={logo.width} height={logo.height}></Image>
                </div>
                <NavSearch></NavSearch>
                <div className={`verticalCenterEL ${STmainLayout.middleNav_contact}`}>
                    <div>
                    {getSVGicons(icons.accountDetailsIcon,20,20)}
                    </div>
                    <div>
                        <p>{headerMiddleData.contact.title} <span>or :</span> </p>
                        <p>{headerMiddleData.contact.phone_number}</p>
                    </div>
                </div>
                <div className={STmainLayout.middleNave_buttons}>
                    <div className={`verticalCenterEL ${STmainLayout.middleNave_button}` }>
                        <div>{headerMiddleData.buttons[0].reactIcon}</div>
                        <div>{headerMiddleData.buttons[0].title}</div>
                    </div>
                    <div className={`verticalCenterEL ${STmainLayout.middleNave_button}` }>
                        <div>{headerMiddleData.buttons[1].reactIcon}</div>
                        <div>{headerMiddleData.buttons[1].title}</div>
                    </div>
                    <div className={`verticalCenterEL ${STmainLayout.middleNave_button}` } style={{position:"relative"}} onClick={()=>setIsCartOpen(true)}>
                        <div style={{position:"absolute",top:"-10px",right:"-5px", backgroundColor:"CornflowerBlue",color:"white", padding:"0 2px",width:"18px",height:"18px", borderRadius:"50%", display:"flex",justifyContent:"center"}}>{cart.length}</div>
                        <div>{headerMiddleData.buttons[2].reactIcon}</div>
                        <div>{headerMiddleData.buttons[2].title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;