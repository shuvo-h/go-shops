import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
import MainLayout from '../Components/MainLayout/MainLayout';
import { registration_pageMeta } from '../DataSetStatic/authData/authData';
import authST from "./../styles/auth.module.css";
import { useRouter } from 'next/router';
import LoaderSquareCombine from '../Components/common/Loader/LoaderSquareCombine/LoaderSquareCombine';
import { useSelector } from 'react-redux';

const Registration = () => {
    const router = useRouter();
    const [newUserInfo,setNewUser] = useState({role:"user"});
    const [isLoadingReg,setIsLoadingReg] = useState(false);
    
    const {user,login_status,login_err} = useSelector(state =>state.User);
    useEffect(()=>{
        if (user) {
            // alert("You are already logged in!");
            // router.push("/");
        }
    },[user])

    const onChangeRegistrationInfo = (e,actionType) =>{
        console.log(e.target.value,e.target.checked);
        switch (e.target.name) {
            case "address":
                setNewUser(pre=>{
                    const tempInfo = {...pre};
                    tempInfo['address'][e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
        
            default:
                setNewUser(pre=>{
                    const tempInfo = {...pre};
                    tempInfo[e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
        }
    }
    
    const handleRegistration = e =>{
        e.preventDefault();
        if (newUserInfo.password === newUserInfo.confirm_password) {
            setIsLoadingReg(true)
            fetch("/api/users/user",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify(newUserInfo)
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                setIsLoadingReg(false);
                if (!data.error) {
                    alert("registration successfull!");
                    router.push("/login");
                }else{
                    console.log(data.message);
                    alert(JSON.stringify(data.message))
                }
            })
            .catch(err=>{
                // console.log(err);
                alert(err.message);
                setIsLoadingReg(false);
            })
            
        }else{
            alert("Password didn't match")
        }
    }
    console.log(login_status);
    if (login_status || user.token) {
        return <div className='centerEL' style={{height:"100vh"}}>
            <LoaderSquareCombine></LoaderSquareCombine>
        </div>
    }

    return (
        <MainLayout pageMeta={registration_pageMeta}>
            <section className={`baseContainer ${authST.login_container}`}>
                
                <div>
                    <img src="/customImg/registration-banner.png" alt="" />
                </div>
                <div className={authST.login_form_wrapper}>
                    <h3>Welcome To GoShop</h3>
                    <span>I am a <strong>{newUserInfo.role}</strong></span>
                    <h1>Registration Here</h1>
                    <form onSubmit={handleRegistration}>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Email:</p></div>
                            <div><input onChange={e=>onChangeRegistrationInfo(e)} name="email" type="email"  placeholder='Write your email address' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>First Name:</p></div>
                            <div><input onChange={e=>onChangeRegistrationInfo(e)} name="first_name" type="text"  placeholder='First name' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Last Name:</p></div>
                            <div><input onChange={e=>onChangeRegistrationInfo(e)} name="last_name" type="text"  placeholder='Last name' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Password:</p></div>
                            <div><input onChange={e=>onChangeRegistrationInfo(e)} name="password" type="password"  placeholder='password' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Confirm Password :</p></div>
                            <div><input onChange={e=>onChangeRegistrationInfo(e)} name="confirm_password" type="password"  placeholder='confirm password' required/></div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Account Type: </p></div>
                            <div style={{display:"flex",justifyContent:"space-around", width:"100%"}}>
                                <div className={`centerEL`}>
                                    <input onChange={e=>onChangeRegistrationInfo(e)} name="role" value={'vendor'} type="checkbox" checked={newUserInfo.role === 'vendor' ? true : false} />
                                    <p>Vendor</p>
                                </div>
                                <div className={`centerEL`}>
                                    <input onChange={e=>onChangeRegistrationInfo(e)} name="role" value={'user'}  type="checkbox" checked={newUserInfo.role === 'user' ? true : false} />
                                    <p>User</p>
                                </div>
                            </div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p>Address:</p></div>
                            <div>
                                <div className={`${authST.address}`}>
                                    <div className={`centerEL ${authST.flexGap}`}>
                                        <div><p>Street: </p></div>
                                        <div><input  onChange={e=>onChangeRegistrationInfo(e,"address")} name="street" type="text" required /></div>
                                    </div>
                                    <div className={`centerEL`}>
                                        <div><p>city: </p></div>
                                        <div><input  onChange={e=>onChangeRegistrationInfo(e,"address")} name="city" type="text" required /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${authST.login_input_wrapper}`}>
                            <div><p></p></div>
                            <div>
                                <div className={`${authST.address}`}>
                                    <div className={`centerEL ${authST.flexGap}`}>
                                        <div><p>state: </p></div>
                                        <div><input  onChange={e=>onChangeRegistrationInfo(e,"address")} name="state" type="text" required /></div>
                                    </div>
                                    <div className={`centerEL ${authST.flexGap}`}>
                                        <p>zip: </p>
                                        <input  onChange={e=>onChangeRegistrationInfo(e,"address")} name="zip" type="text" required />
                                    </div>
                                    <div className={`centerEL ${authST.flexGap}`}>
                                        <p>country: </p>
                                        <input  onChange={e=>onChangeRegistrationInfo(e,"address")} name="country" type="text" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{margin:"40px auto"}}>
                            {
                                isLoadingReg
                                ? <LoaderSquareCombine></LoaderSquareCombine>
                                : <button className='btn' type='submit'>Sign Up</button>
                            }
                            
                        </div>
                    </form>
                </div>

            </section>
        </MainLayout>
    );
};

export default Registration;