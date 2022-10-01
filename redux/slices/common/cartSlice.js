import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    cart:[],
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state,{payload}) => {
        const indexOfExist = state.cart.findIndex((cart)=>((cart.productID === payload.productID)&&(cart.varityID === payload.varityID)));
        if (indexOfExist > -1) {
            state.cart = state.cart.splice(indexOfExist,1,payload);
        }else{
            state.cart = [...state.cart,payload]
        }
    },
    removeFromCart: (state,{payload}) => {
        const indexOfExist = state.cart.findIndex((cart)=>((cart.productID === payload.productID)&&(cart.varityID === payload.varityID)));
        if (indexOfExist > -1) {
            state.cart = state.cart.splice(indexOfExist,1);
        }else{
            state.cart = [...state.cart,payload]
        }
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,removeFromCart } = CartSlice.actions

export default CartSlice.reducer