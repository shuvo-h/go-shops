import React from 'react';
import NavBarLink from '../common/NavLink/NavLink';
import homeST from "./homeStyle.module.css";

const OnlineBusiness = () => {
    return (
        <section className={`baseContainer ${homeST.onlineBusiness}`}>
            <div className={`centerEL ${homeST.commession}`}>
                <div>25</div>
                <div>
                    <sub>%</sub>
                    <sub>COMMISSION</sub>
                </div>
            </div>
            <div className='centerEL'>
                <h1>BRING YOUR BUSINESS ONLINE</h1>
            </div>
            <div className='centerEL'>
                <NavBarLink slug={"/regester"}>
                    <a className={homeST.commession_btn}>SIGNUP NOW</a>
                </NavBarLink>
            </div>
        </section>
    );
};

export default OnlineBusiness;