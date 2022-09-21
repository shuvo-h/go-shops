import React from 'react';
import MainLayout from '../../MainLayout/MainLayout';
import LoaderSquareCombine from '../Loader/LoaderSquareCombine/LoaderSquareCombine';

const UnAuthLayout = ({pageMeta}) => {
    return (
        <MainLayout pageMeta={pageMeta}>
            <LoaderSquareCombine></LoaderSquareCombine>
        </MainLayout>
    );
};

export default UnAuthLayout;