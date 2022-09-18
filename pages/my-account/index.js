import React from 'react';
import myAccountST from "../../styles/MyAccount.module.css";
import MainLayout from '../../Components/MainLayout/MainLayout';
import RightViewArea from '../../Components/myAccountComponents/RightViewArea';
import SideNav from '../../Components/myAccountComponents/SideNav';
import { my_account_pageMeta } from '../../DataSetStatic/HomePage/data_my_account';
import PrivateRoute from '../../Components/common/privateRoute/PrivateRoute';

const MyAccount = () => {
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