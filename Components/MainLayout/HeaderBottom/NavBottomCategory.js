import React, { useState } from 'react';
import mainLayoutST from '../mainLayout.module.css';
import { useSelector } from 'react-redux';
import NavLink from "next/link"
import { category_icon, getReactIcon } from '../../../utils/client_utils/icons/getReactIcon';
import HeadNavSubCategory from './HeadNavSubCategory';



const NavBottomCategory = () => {
    const [subCtgHover,setSubCtgHover] = useState("")
    const mainCategory = useSelector(({Home}) => Home.categories);
    // console.log(mainCategory);
    
    return (
        <div className={mainLayoutST.headerBTM_ct_wrapper}>
            <div className='centerEL'>
                <div className={`${mainLayoutST.headerBTM_ctg} ${mainLayoutST.category_spacing}`}>
                    {getReactIcon("GrUnorderedList",22)}
                    BROWSE CATEGORIES
                </div>
            </div>
            <div className={mainLayoutST.headerBTM_main_ctg}>
                <div>
                    {
                        mainCategory?.length && mainCategory?.slice(0,10).map((mainCtg,idx) =>{ 
                            // console.log(mainLayoutST);
                            return <div className={`${mainLayoutST.headerBTM_main_ctg_wrapper}`} key={mainCtg.category} style={{position:"relative",}}>
                            <div>
                                <NavLink href={"/"}>
                                    <a className={mainLayoutST.category_spacing}>
                                        {getReactIcon(mainCtg.icon.toString(),22)} 
                                        {mainCtg.category} {">"}
                                    </a>
                                </NavLink>
                            </div>
                            <div className={mainLayoutST.sub_ctg_wrap}>
                                <div className={`${mainLayoutST[`sub_ctg_${idx}`]}`}>
                                    <HeadNavSubCategory sub_category={mainCtg.sub_category} separator={mainCtg.separator}></HeadNavSubCategory>
                                </div>
                            </div>
                        </div>}
                        )
                    }

                </div>
                <NavLink href={"/"}><a className={mainLayoutST.category_spacing}>VIEW ALL CATEGORIES</a></NavLink>
            </div>
        </div>
    );
};

export default NavBottomCategory;






