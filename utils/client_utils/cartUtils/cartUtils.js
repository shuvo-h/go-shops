export  const getCartProducts = async(cart) =>{
    try {
        const cartRes = await fetch("/api/products/cartproducts",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(cart)
        })
        const cartData = await cartRes.json();

        let sum = 0;
        const cartinfo = cartData.data.map(cartInfo=>{
            // add the image name and price to the cart and check if quentity is sufficient
            let matchedCart = cart.find(el=>(el.productID === cartInfo._id && cartInfo.varity?.length && el.varityID === cartInfo.varity[0]._id));
            if (cartInfo.varity.length && (cartInfo.varity[0]?.quantity >= matchedCart.order_quantity)) {
                // cartInfo.order_quantity = matchedCart.order_quantity;
                matchedCart = {...matchedCart,img:cartInfo.img[0],title:cartInfo.title,...cartInfo.varity[0]}
                sum += matchedCart.price * matchedCart.order_quantity
                return matchedCart;
            }else{return null;}
        }).filter(el=>el !== null)

        return {cartinfo,sum}
    } catch (error) {
        console.log(error);
        return error.message;
    }

}