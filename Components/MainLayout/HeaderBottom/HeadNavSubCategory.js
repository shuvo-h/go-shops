import React from 'react';
import mainLayoutST from '../mainLayout.module.css';


const HeadNavSubCategory = ({sub_category}) => {
    // console.log(sub_category.slice(2));
    return (
        <div className={mainLayoutST.navBTM_sub_ctg}>
            <div>
                <h4 className={mainLayoutST.navBTM_gender}>Woman</h4>
                <div>
                    {
                        sub_category.map(ctg => <p className={mainLayoutST.navBTM_sub_ctg_btn} key={ctg}>{ctg}</p>)
                    }
                </div>
            </div>
            <div>
                <h4 className={mainLayoutST.navBTM_gender}>Man</h4>
                <div>
                    {
                        sub_category.map(ctg => <p className={mainLayoutST.navBTM_sub_ctg_btn} key={ctg}>{ctg}</p>)
                    }
                </div>
            </div>
            <div className={mainLayoutST.navBTM_subCtg_discount}>
                <h4>Get up to 20% commission</h4>
                <h2>Become a Seller</h2>
                <h5>SIGN UP NOW</h5>
            </div>
        </div>
    );
};

export default HeadNavSubCategory;