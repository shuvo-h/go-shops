import React from 'react';
import mainLayoutST from '../mainLayout.module.css'
import NavBottomCategory from './NavBottomCategory';

const HeaderBottom = () => {
    return (
        <div className={`baseContainer centerEL`}>
            <NavBottomCategory></NavBottomCategory>
            
            <h2 className={mainLayoutST.headerBottomNav_links}>Nav Links</h2>
            <h2>Order location</h2>
            <h2>Daily Deals</h2>
        </div>
    );
};

export default HeaderBottom;