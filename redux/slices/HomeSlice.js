import { createSlice } from '@reduxjs/toolkit';

const initialHomeState = {
    categories:[],
}

export const HomeSlice = createSlice({
  name: 'Home',
  initialState: initialHomeState,
  reducers: {
    setCategoriesInHome: (state,{payload}) => {
        state.categories = payload;
    },
    
    
  },
})

// Action creators are generated for each case reducer function
export const { setCategoriesInHome, } = HomeSlice.actions

export default HomeSlice.reducer