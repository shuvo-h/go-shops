import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { loginThunkFn } from '../../utils/client_utils/reduxThunkUtils/authThunk';
export const userCookieName = "userInfo";

// fetch the user to login
export const fetchUserLogin = createAsyncThunk('users/login',loginThunkFn)
/*
export const fetchUserLogin = createAsyncThunk('users/login',async(payloadData)=>{
    const response = await fetch("/api/users/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payloadData)
    })
    console.log(response,"with out jeson res");
    const data = await response.json();
    console.log(data,"log data");
    return data;
})
*/
const initialUserState = {
    user: Cookies.get(userCookieName) ? JSON.parse(Cookies.get(userCookieName)) : {},
    login_status: false,
    login_err: ""
}

export const UserSlice = createSlice({
  name: 'User',
  initialState: initialUserState,
  reducers: {
    loginUser: (state,{payload}) => {
        state.categories = payload;
    },
    fetchLoginStatus: (state,{payload}) =>{
        state.login_status = payload;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(fetchUserLogin.pending,(state,{payload})=>{
        state.login_status = true;
        state.login_err = "";
    })
    builder.addCase(fetchUserLogin.fulfilled,(state,{payload})=>{
        console.log(payload);
        if (!payload.error) {
            state.user = payload.data;
            Cookies.set(userCookieName,JSON.stringify(payload.data));
            state.login_err = "";
        }else{
            state.user = payload;
            state.login_err = payload.message;

        }
        state.login_status = false;
    })
    builder.addCase(fetchUserLogin.rejected,(state,{payload})=>{
        state.login_status = false;
    })
  }
  
})

// Action creators are generated for each case reducer function
export const { loginUser, fetchLoginStatus} = UserSlice.actions

export default UserSlice.reducer;