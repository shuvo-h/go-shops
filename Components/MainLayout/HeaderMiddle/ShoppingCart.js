import Image from 'next/image';
import React from 'react';
import Navlink from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../../../redux/slices/common/cartSlice';
import { getCartProducts } from '../../../utils/client_utils/cartUtils/cartUtils';

const ShoppingCart = ({setIsCartOpen}) => {
    const cart = useSelector(state=>state.Cart.cart);
    const dispatch = useDispatch();
    const[cartProducts,setCartProducts]=useState({cartinfo:[],sum:0});

    // console.log(cart);
    useEffect(()=>{
       const cartinfoFn = async() =>{
            const cartInfo =  await getCartProducts(cart)
            setCartProducts(cartInfo);
       };
       cartinfoFn();
    },[cart.length])



    // console.log(cartProducts);
    const handleCarDelete = (cart) =>{
        // delete from locatstorage nad this cart state
        // const deleteIndex = cartProducts.cartinfo.findIndex(cartEl => (cartEl.productID === cart.productID && cartEl.varityID === cart.varityID))
        let sum = 0;
        const newCarList = cartProducts.cartinfo.filter(cartEl =>{
            if ((cartEl.productID === cart.productID && cartEl.varityID === cart.varityID)) {
                // do nothing
            }else{
                // add sum
                sum += cartEl.price * cartEl.order_quantity;
                return cartEl;
            }
        })
        setCartProducts({cartinfo:newCarList,sum});

        // set the new cart to the local also
        const newCt = newCarList.map(cartEl =>{
            return {varityID:cartEl.varityID,productID:cartEl.productID,order_quantity:cartEl.order_quantity}
        })
        localStorage.setItem("goShop",JSON.stringify(newCt))
    }

    return (
        <div style={{position:"fixed",top:0,right:0,height:"100vh", width:"100vw",backgroundColor:"rgba(0,0,0,0.3)",zIndex:2}}>
            <div style={{position:"fixed",top:0,right:0,width:"20rem",height:"100vh", backgroundColor:"white",overflowY:"scroll",}}>
                <div>
                    <h4>Shopping Cart</h4>
                    <button style={{margin:"10px 10px auto auto", display:"block"}} onClick={()=>setIsCartOpen(false)}>Close</button>
                </div>
                <div>
                    {
                        cartProducts.cartinfo?.map(cartEl => <div style={{display:"flex",justifyContent:"space-between",padding:"1rem"}} key={cartEl._id}>
                            <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
                                <h5 className='m-0'>{cartEl.title}</h5>
                                <p className='m-0'>{cartEl.order_quantity} x ${cartEl.price}</p>
                            </div>
                            <div style={{position:"relative"}}>
                                <button style={{position:"absolute",zIndex:1,right:"-10px",top:"-10px",cursor:"pointer"}} onClick={()=>handleCarDelete(cartEl)}>X</button>
                                <Image src={cartEl.img} width={80} height={80} alt={cartEl.title}></Image>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <h5>Subtotal:</h5>
                    <h5>${cartProducts.sum}</h5>
                </div>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    <Navlink href={"/cart"}><a onClick={()=>setIsCartOpen(false)}>View Details</a></Navlink>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;

