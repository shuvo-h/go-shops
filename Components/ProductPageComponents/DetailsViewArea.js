import React from 'react';
import { useState } from 'react';
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductInfoAndCardOption from './ProductInfoAndCardOption';

const DetailsViewArea = ({product,shopInfo}) => {
    const [activeNav,setActiveNav] = useState("description");
    // most freequent order getting mongo operation reference
    // https://mongoplayground.net/p/pLuJYl_foLG

    return (
        <div>
            <ProductInfoAndCardOption product={product} shopInfo={shopInfo}></ProductInfoAndCardOption>
            <div>
                Freequent brough  area(Do after completing order place)
            </div>
            <div>
                <ProductDetailsInfo product={product} shopInfo={shopInfo}></ProductDetailsInfo>
            </div>
            <div>More Product of this vendor</div>
            <div>Related products</div>
        </div>
    );
};

export default DetailsViewArea;