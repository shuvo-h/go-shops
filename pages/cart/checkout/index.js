import React from 'react';
import NavStepShowArrow from '../../../Components/common/NavLink/NavStepShowArrow';
import MainLayout from '../../../Components/MainLayout/MainLayout';

const checkout_metadata = {
    title:"Checkout",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}

const stepsNavList = [
    {name:"Shopping Cart", path:"/cart"},
    {name:"Checkout", path:"/cart/checkout"},
    {name:"Order Complete", path:"/cart/checkout/order", disable:true},
]

const CheckoutProduct = () => {
    return (
        <MainLayout pageMeta={checkout_metadata}>
            <NavStepShowArrow stepsNavList={stepsNavList}></NavStepShowArrow>
        </MainLayout>
    );
};

export default CheckoutProduct;