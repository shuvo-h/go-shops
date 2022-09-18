import React, { useState } from 'react';
import authST from "./../styles/auth.module.css";
import MainLayout from '../Components/MainLayout/MainLayout';
import { login_pageMeta } from '../DataSetStatic/authData/authData';
import LoaderSquareCombine from '../Components/common/Loader/LoaderSquareCombine/LoaderSquareCombine';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { fetchUserLogin, userCookieName } from '../redux/slices/LoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [userInfo,setUserInfo] = useState({});
    const {user,login_status,login_err} = useSelector(state =>state.User);
    useEffect(()=>{
        if (user._id) {
            router.push("/")
        }
    },[user])
    

    const onChangeLoginInfo = (e) =>{
        setUserInfo(pre=>{
            const tempInfo = {...pre};
            tempInfo[e.target.name] = e.target.value;
            return tempInfo;
        })
    }
    
    const handleLogin = e =>{
        e.preventDefault();
        dispatch(fetchUserLogin(userInfo));
        
    }


    return (
        <MainLayout pageMeta={login_pageMeta}>
            <section className={`baseContainer ${authST.login_container}`}>
                <div>
                    <img src="/customImg/login-banner.png" alt="" />
                </div>
                <div className={authST.login_form_wrapper}>
                    <h3>Welcome To GoShop</h3>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Email:</p></div>
                            <div><input onChange={e=>onChangeLoginInfo(e)} name="email" type="email"  placeholder='Write your email address' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Password:</p></div>
                            <div><input onChange={e=>onChangeLoginInfo(e)} name="password" type="password"  placeholder='password' required/></div>
                        </div>
                        <div style={{margin:"40px auto"}}>
                            {
                                login_status ? 
                                <LoaderSquareCombine></LoaderSquareCombine>
                                : <button className='btn' type='submit'>Login</button>
                            }
                            <div>
                                {login_err && <p style={{color:"red"}}>{login_err}</p>}
                            </div>
                        </div>
                    </form>
                </div>

            </section>
        </MainLayout>
    );
};

export default Login;