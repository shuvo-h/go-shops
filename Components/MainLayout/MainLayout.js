import React from 'react';
import mainLayoutST from './mainLayout.module.css'
import HeadMainPage from '../common/HeadMain/HeadMainPage';
import SubTopNav from './SubTopNav/SubTopNav';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';

const MainLayout = ({children,pageMeta}) => {
    return (
        <div>
            <HeadMainPage page_head_meta_info={pageMeta}></HeadMainPage>
            <header className={`${mainLayoutST.header}`}>
                <SubTopNav></SubTopNav>
                <HeaderMiddle></HeaderMiddle>
                main Nav
            </header>
            <main>
                {children}
            </main>
            <footer>
                subscrib
                footer details 
                copywrite
            </footer>
        </div>
    );
};

export default MainLayout;

