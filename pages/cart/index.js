import Image from "next/image";
import NavLink from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import NavStepShowArrow from "../../Components/common/NavLink/NavStepShowArrow";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getCartProducts } from "../../utils/client_utils/cartUtils/cartUtils";

const Shipping_cartPage_metadata = {
    title:"Checkout",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}

const cartStepsNavList = [
    {name:"Shopping Cart", path:"/cart"},
    {name:"Checkout", path:"/cart/checkout"},
    {name:"Order Complete", path:"/cart/checkout/order", disable:true},
]


const ShippingCart = () => {
    const cart = useSelector(state=>state.Cart.cart);
    const[cartProducts,setCartProducts]=useState({cartinfo:[],sum:0});

    console.log(cartProducts);
    useEffect(()=>{
       const cartinfoFn = async() =>{
            const cartInfo =  await getCartProducts(cart)
            setCartProducts(cartInfo);
       };
       cartinfoFn();
    },[cart.length])


    return (
        <MainLayout pageMeta={Shipping_cartPage_metadata}>
            <section className="baseContainer">
                <div style={{margin:"auto", width:"fit-content"}}>
                    <NavStepShowArrow stepsNavList={cartStepsNavList} navStylesItem={{fontSize:"25px"}} navStylesContainer={{padding:"50px"}}></NavStepShowArrow>
                </div>
            </section>
            <section style={{display:"grid",gridTemplateColumns:"4fr 1fr"}} className="baseContainer">
                <aside>
                    cart details
                    <div>
                        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr"}}>
                            <h3>Product</h3>
                            <h3>Price</h3>
                            <h3>Quantity</h3>
                            <h3>Subtotal</h3>
                        </div>
                        <div>
                            <div>map card</div>
                            {
                                cartProducts.cartinfo?.map(cart=><div  style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr"}} key={cart.productID}>
                                    <div style={{display:"flex", gap:"10px"}}>
                                        <div><Image src={cart.img} width={80} height={50} alt={cart.title}></Image></div>
                                        <div><h4>{cart.title}</h4></div>
                                    </div>
                                    <div>${cart.price}</div>
                                    <div>
                                        {cart.order_quantity}
                                        <button>+</button>
                                        <button>-</button>
                                    </div>
                                    <div>${cart.order_quantity * cart.price}</div>
                                </div>)
                            }
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <button><NavLink href={"/shop"}><a>Continue Shopping</a></NavLink> <a></a></button>
                        <div>
                            <button>Clear Cart</button>
                            <button>Update cart</button>
                        </div>
                    </div>
                    <div>coupon discount</div>
                </aside>
                <aside>
                    cart total
                </aside>
            </section>
        </MainLayout>
    );
};

export default ShippingCart;