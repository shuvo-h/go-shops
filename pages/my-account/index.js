import React from 'react';
import myAccountST from "../../styles/MyAccount.module.css";
import MainLayout from '../../Components/MainLayout/MainLayout';
import RightViewArea from '../../Components/myAccountComponents/RightViewArea';
import SideNav from '../../Components/myAccountComponents/SideNav';
import { my_account_pageMeta } from '../../DataSetStatic/HomePage/data_my_account';
import PrivateRoute from '../../Components/common/privateRoute/PrivateRoute';
import { useSelector } from 'react-redux';
import UnAuthLayout from '../../Components/common/UnAuthLayout/UnAuthLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyAccount = () => {
    // const router = useRouter()
    // const {user,login_status,login_err} = useSelector(state =>state.User);
    // console.log(user);
    // useEffect(()=>{
    //     if (!login_status && !user.token) {
    //         router.replace("/login");
    //     }
    // },[])

    // if (login_status) {
    //     return <UnAuthLayout></UnAuthLayout>
    // }

    return (
        <MainLayout pageMeta={my_account_pageMeta}>
            <PrivateRoute>
                <section>
                    <div>
                        <h1 className={`centerEL m-0 ${myAccountST.pageHeading}`}>My Account</h1>
                    </div>
                    <div className={`baseContainer`}>
                        <div className={myAccountST.showPagination}>
                            <p>Home &gt; My account</p>
                        </div>
                        <div className={myAccountST.accountContainer}>
                            <SideNav></SideNav>
                            <RightViewArea></RightViewArea>
                        </div>
                    </div>
                </section>
            </PrivateRoute>
        </MainLayout>
    );
};

export default MyAccount;