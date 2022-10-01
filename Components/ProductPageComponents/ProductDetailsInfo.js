import React from 'react';
import { useState } from 'react';
import ProductDescription from './productDescription';
import ProductReview from './ProductReview';
import ProductSpecifications from './ProductSpecifications';
import ProductVendor from './ProductVendor';

const productSubNavInfo =[
    {name:"Description",path:"Description"},
    {name:"Specification",path:"Specification"},
    {name:"Vendor Info",path:"Vendor Info"},
    {name:"Customer Reviews",path:"Customer Reviews"}
]

const ProductDetailsInfo = ({product,shopInfo}) => {
    const [activeSubNAv,setActiveSubNav] = useState(productSubNavInfo[3].path);
    // console.log(product,shopInfo);

    return (
        <div>
            <nav style={{display:"flex",gap:"3rem"}}>
                {
                    productSubNavInfo.map(subnav=><div key={subnav.path}>
                        <button onClick={()=>setActiveSubNav(subnav.path)}>{subnav.name}</button>
                    </div>)
                }
            </nav>
            <div>
                {activeSubNAv === productSubNavInfo[0].path && <ProductDescription details={product.details} video={product.video} title={product.title}></ProductDescription>}
            </div>
            <div>
                {activeSubNAv === productSubNavInfo[1].path && <ProductSpecifications model={product.model} varity={product.varity} return_policy={product.return_policy}></ProductSpecifications>}
            </div>
            <div>
                {activeSubNAv === productSubNavInfo[2].path && <ProductVendor shopInfo={shopInfo}></ProductVendor>}
            </div>
            <div>
                {activeSubNAv === productSubNavInfo[3].path &&  <ProductReview product={product}></ProductReview>}
            </div>
        </div>
    );
};

export default ProductDetailsInfo;