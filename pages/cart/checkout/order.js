import NavStepShowArrow from "../../../Components/common/NavLink/NavStepShowArrow";
import MainLayout from "../../../Components/MainLayout/MainLayout";

const orderPAge_metadata = {
    title:"Order List",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}

const stepsNavListOrder = [
    {name:"Shopping Cart", path:"/cart"},
    {name:"Checkout", path:"/cart/checkout"},
    {name:"Order Complete", path:"/cart/checkout/order", disable:true},
]

const OrderList = () => {
    return (
        <MainLayout pageMeta={orderPAge_metadata}>
            <NavStepShowArrow stepsNavList={stepsNavList}></NavStepShowArrow>
        </MainLayout>
    );
};

export default OrderList;