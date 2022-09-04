import { createSlice } from '@reduxjs/toolkit'
import { currencies, languages } from '../../../DataSetStatic/appOperator/appOperator'

const initialCommonState = {
    appOperator: {
        languages: languages,
        get activeLanguage() {return languages[0]},
        currency: currencies,
        get activeCurrency() {return currencies[0]} 
    }
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    setLanguage: (state,{payload}) => {
        state.appOperator.activeLanguage = payload;
    },
    setCurrency: (state,{payload}) => {
        state.appOperator.activeCurrency = payload;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage, setCurrency } = commonSlice.actions

export default commonSlice.reducer