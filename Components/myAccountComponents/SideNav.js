import React from 'react';
import { myAccounSideNav } from '../../DataSetStatic/HomePage/data_my_account';
import NavBarLink from '../common/NavLink/NavLink';

const SideNav = () => {
    return (
        <nav className={``}>
            {
                myAccounSideNav.map(navItem => <NavBarLink slug={navItem.path} key={navItem.path}>
                    <a>{navItem.title}</a>
                </NavBarLink>)
            }
        </nav>
    );
};

export default SideNav;