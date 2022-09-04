import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './slices/common/commonSlice'

export const reduxStore = configureStore({
  reducer: {
    common: commonSlice
  },
})