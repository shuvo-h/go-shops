import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoaderSquareCombine from '../Loader/LoaderSquareCombine/LoaderSquareCombine';

const PrivateRoute = ({children}) => {
    const userInfo = useSelector(state => state.User);
    const router = useRouter();
    const [showChild, setShowChild] = useState(false);

    // make the page for dehydration
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }
    // make ensure that window is ready
    if (typeof window === 'undefined') {
        // return <></>;
        return <LoaderSquareCombine></LoaderSquareCombine>
    }

    // console.log(userInfo.login_status);
    if (userInfo.login_status) {
        return <LoaderSquareCombine></LoaderSquareCombine>
    }
    // if router.push() get error for instance, keep it in useEffect to wait for the component unmount
    if (!userInfo.user.token) {
        router.push("/login");
        // return <section>fdgfg</section>
    }
    // console.log(userInfo);
    return children;
};

export default PrivateRoute;