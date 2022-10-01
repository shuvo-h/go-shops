import { configureStore } from '@reduxjs/toolkit'
import CartSlice  from './slices/common/cartSlice'
import commonSlice from './slices/common/commonSlice'
import HomeSlice from './slices/HomeSlice'
import UserSlice  from './slices/LoginSlice'

export const reduxStore = configureStore({
  reducer: {
    common: commonSlice,
    Cart: CartSlice,
    Home: HomeSlice,
    User: UserSlice
  },
})


