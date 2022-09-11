import React from 'react';
import mainLayoutST from './mainLayout.module.css'
import HeadMainPage from '../common/HeadMain/HeadMainPage';
import SubTopNav from './SubTopNav/SubTopNav';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';
import HeaderBottom from './HeaderBottom/HeaderBottom';
import Footer from './Footer/Footer';

const MainLayout = ({children,pageMeta}) => {
    return (
        <div>
            <HeadMainPage page_head_meta_info={pageMeta}></HeadMainPage>
            <header className={`${mainLayoutST.header}`}>
                <SubTopNav></SubTopNav>
                <HeaderMiddle></HeaderMiddle>
                <HeaderBottom></HeaderBottom>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;

