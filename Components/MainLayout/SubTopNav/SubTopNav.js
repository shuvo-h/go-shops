import React, { useState } from 'react';
import navTopST from "./SubTopNav.module.css";
import { IconContext } from "react-icons";
import { BiChevronDown} from 'react-icons/bi';
import { BsPerson} from 'react-icons/bs';
import { currencies, languages } from '../../../DataSetStatic/appOperator/appOperator';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency, setLanguage } from '../../../redux/slices/common/commonSlice';
import NavLink from "next/link"
import { navData } from '../../../DataSetStatic/common/navData';

const SubTopNav = () => {
    const dispatch = useDispatch();
    const [isLangStored,sestIsLangStored] = useState(false);
    const {activeCurrency, activeLanguage} = useSelector(({common:{appOperator}})=>appOperator);
    const {welcome_message,navLinks,account} = navData;
   
    
    return (
        <div className={navTopST.header_top}>
            <div className={`centerEL ${navTopST.container_top}`}>
                <div>
                    <p className={navTopST.welcomeMessage}>{welcome_message}</p>
                </div>
                <div>
                    <ul className={navTopST.nav_items}>
                        <li className={navTopST.nav_item}>
                            <div className={`verticalCenterEL ${navTopST.nav_item_width}`}>
                                {activeCurrency.name}
                                <IconContext.Provider value={{ size:"17",color: "black", className: "global-class-name" }}><BiChevronDown /></IconContext.Provider>
                            </div>
                            <div className={navTopST.nav_item_expand}>
                                {
                                    currencies.filter(cur => cur.name !== activeCurrency.name).map(currency =><div onClick={()=>dispatch(setCurrency(currency))}  key={currency.name}>{currency.name}</div>)
                                }
                            </div>
                        </li>
                        <li className={navTopST.nav_item}>
                            <div className={`verticalCenterEL ${navTopST.nav_item_width}`}>
                                {activeLanguage.name}
                                <IconContext.Provider value={{ size:"17",color: "black", className: "global-class-name" }}><BiChevronDown /></IconContext.Provider>
                            </div>
                            <div className={navTopST.nav_item_expand}>
                                {
                                    languages.filter(lang => lang.name !== activeLanguage.name).map(language =><div onClick={()=>dispatch(setLanguage(language))} key={language.name}>{language.name}</div>)
                                }
                            </div>
                        </li>
                        <li className={navTopST.nav_item}>|</li>
                        <li className={navTopST.nav_item}>{account.accountTitle}</li>
                        <li className={`${navTopST.nav_item} verticalCenterEL`}>
                            <IconContext.Provider value={{ size:"17",color: "black", className: "global-class-name" }}><BsPerson /></IconContext.Provider>
                                <NavLink href={navLinks.login.path}><a className={navTopST.navLink}>{navLinks.login.title}</a></NavLink>
                                 {" "}/{" "}  
                                 <NavLink href={navLinks.register.path}><a className={navTopST.navLink}>{navLinks.register.title}</a></NavLink>
                            </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubTopNav;