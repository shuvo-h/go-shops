import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/common/commonSlice'
import HomeSlice from './slices/HomeSlice'

export const reduxStore = configureStore({
  reducer: {
    common: commonSlice,
    Home: HomeSlice
  },
})