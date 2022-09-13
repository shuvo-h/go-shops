import React from 'react';
import myAccountST from "../../styles/MyAccount.module.css";
import { myAccounViewAreaData } from '../../DataSetStatic/HomePage/data_my_account';
import { getSVGicons } from '../../utils/client_utils/icons/getSVGIcons';
import NavBarLink from '../common/NavLink/NavLink';

const RightViewArea = () => {
    return (
        <div className={myAccountST.viewArea}>
            {
                myAccounViewAreaData.map(view => <NavBarLink slug={view.path} key={view.path}>
                    <a className='centerEL'>
                        {getSVGicons(view.icon,60,60)}
                        <span>{view.title}</span>
                    </a>
                </NavBarLink>)
            }
        </div>
    );
};

export default RightViewArea;