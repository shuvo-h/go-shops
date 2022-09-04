import Image from 'next/image';
import React from 'react';
import { headerMiddleData } from '../../../DataSetStatic/common/navData';

import NavSearch from './NavSearch';

const HeaderMiddle = () => {
    const {logo,productCategories,contact,buttonTitles} = headerMiddleData;
    return (
        <div className='baseContainer'>
            <div>
                <Image src={logo.path} alt={logo.title} width={logo.width} height={logo.height}></Image>
            </div>
            <NavSearch></NavSearch>
            <div></div>
            <div></div>
        </div>
    );
};

export default HeaderMiddle;