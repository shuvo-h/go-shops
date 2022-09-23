import React, { useState } from 'react';
import mainLayoutST from '../mainLayout.module.css';
import { useSelector } from 'react-redux';
import NavLink from "next/link"
import HeadNavSubCategory from './HeadNavSubCategory';
import { getSVGicons, icons } from '../../../utils/client_utils/icons/getSVGIcons';



const NavBottomCategory = () => {
    const [subCtgHover,setSubCtgHover] = useState("")
    const mainCategory = useSelector(({Home}) => Home.categories);
    // console.log(mainCategory);
    
    return (
        <div className={mainLayoutST.headerBTM_ct_wrapper}>
            <div className='centerEL'>
                <div className={`${mainLayoutST.headerBTM_ctg} ${mainLayoutST.category_spacing}`}>
                    {getSVGicons(icons.accountDetailsIcon)}
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
                                        {getSVGicons(icons.accountDetailsIcon)} 
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






