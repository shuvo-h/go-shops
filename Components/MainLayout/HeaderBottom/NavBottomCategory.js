import React from 'react';
import mainLayoutST from '../mainLayout.module.css'
import { useSelector } from 'react-redux';
import NavLink from "next/link"
import { category_icon, getReactIcon } from '../../../utils/client_utils/icons/getReactIcon';

const NavBottomCategory = () => {
    const mainCategory = useSelector(({Home}) => Home.categories.main);
    
    return (
        <div className={mainLayoutST.headerBTM_ct_wrapper}>
            <div className='centerEL'>
                <div className={`${mainLayoutST.headerBTM_ctg} ${mainLayoutST.category_spacing}`}>
                    {getReactIcon("GrUnorderedList",22)}
                    BROWSE CATEGORIES
                </div>
            </div>
            <div className={mainLayoutST.headerBTM_main_ctg}>
                {
                    mainCategory?.length && mainCategory?.map(mainCtg => <NavLink href={"/"} key={mainCtg.main_category}>
                        <a className={mainLayoutST.category_spacing}>
                            {getReactIcon(mainCtg.icon.toString(),22)} 
                            {mainCtg.main_category}
                        </a>
                    </NavLink>)
                }
                <p>VIEW ALL CATEGORIES</p>
            </div>
        </div>
    );
};

export default NavBottomCategory;

/*
const categories = {
    property: "category",
    main: [{
        main_category: "Fashion",
        icon: "fashion icon"
    }],
    sub: [{
        sub_category : "Latest",
        icon:"new icon"
    }],
    gender: ["Male","Female"]
}
*/
