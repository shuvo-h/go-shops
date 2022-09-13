import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/common/commonSlice'
import HomeSlice from './slices/HomeSlice'
import UserSlice  from './slices/LoginSlice'

export const reduxStore = configureStore({
  reducer: {
    common: commonSlice,
    Home: HomeSlice,
    User: UserSlice
  },
})