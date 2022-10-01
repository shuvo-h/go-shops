import React from 'react';
import NavLink from 'next/link';
import mainLayoutST from '../mainLayout.module.css';


const HeadNavSubCategory = ({sub_category,mainCategory,separator}) => {
    // console.log(separator.slice(0,2),"sep",sub_category,mainCategory);

    return (
        <div className={mainLayoutST.navBTM_sub_ctg}>
            {
                separator.slice(0,2).map(separateCtg => <div key={separateCtg}>
                    <h4 className={mainLayoutST.navBTM_gender}>{separateCtg}</h4>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        {
                            // sub_category.map(ctg => <p className={mainLayoutST.navBTM_sub_ctg_btn} key={ctg}>{ctg}</p>)
                            //  const products = await ProductsModel.find({["category.sub_category"]:"expensive"}).select("category").lean()
                            sub_category.map(ctg => <NavLink href={{pathname:'shop',query:{category:mainCategory,separator:separateCtg,sub_category:ctg}}} passHref={true} shallow={false}  key={ctg}><a className={mainLayoutST.navBTM_sub_ctg_btn}>{ctg}</a></NavLink>)
                        }
                    </div>
                </div>)
            }
            
            <div className={mainLayoutST.navBTM_subCtg_discount}>
                <h4>Get up to 20% commission</h4>
                <h2>Become a Seller</h2>
                <h5>SIGN UP NOW</h5>
            </div>
        </div>
    );
};


/*
const HeadNavSubCategory = ({sub_category}) => {
    console.log(sub_category.slice(2));
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


*/

export default HeadNavSubCategory;