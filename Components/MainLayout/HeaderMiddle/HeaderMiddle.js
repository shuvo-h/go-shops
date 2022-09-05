import Image from 'next/image';
import React from 'react';
import { BsSearch,BsTelephone } from 'react-icons/bs';
import { IconContext } from "react-icons";
import { headerMiddleData } from '../../../DataSetStatic/common/navData';
import STmainLayout from "../mainLayout.module.css";
import NavLink from "next/link"

import NavSearch from './NavSearch';

const HeaderMiddle = () => {
    const {logo,productCategories,contact,buttonTitles} = headerMiddleData;
    return (
        // <div className='baseContainer '>
        <div className={STmainLayout.middleNave_Container}>
            <div className={`baseContainer ${STmainLayout.middleNave_wrapper}`}>
                <div>
                    <Image src={logo.path} alt={logo.title} width={logo.width} height={logo.height}></Image>
                </div>
                <NavSearch></NavSearch>
                <div className={`verticalCenterEL ${STmainLayout.middleNav_contact}`}>
                    <div>
                        <IconContext.Provider value={{ color: "blue", className: "global-class-name" }}><BsTelephone /></IconContext.Provider>
                    </div>
                    <div>
                        <p>{headerMiddleData.contact.title} <span>or :</span> </p>
                        <p>{headerMiddleData.contact.phone_number}</p>
                    </div>
                </div>
                <div className={STmainLayout.middleNave_buttons}>
                    {
                        headerMiddleData.buttons.map(buttonInfo => <div className={`verticalCenterEL ${STmainLayout.middleNave_button}` } key={buttonInfo.title}>
                            <NavLink href={"/"}>
                                <a className=''>
                                    {buttonInfo.reactIcon}
                                    {buttonInfo.title}
                                </a>
                            </NavLink>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;