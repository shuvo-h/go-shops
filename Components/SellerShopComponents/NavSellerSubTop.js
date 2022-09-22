import { useRouter } from 'next/router';
import React from 'react';

export const navSubSellerTopData = [
    {name:"Products",path:"products"},
    {name:"About",path:"about"},
    {name:"Policies",path:"policies"},
    {name:"Reviews",path:"reviews"},
]

const NavSellerSubTop = ({setViewNav}) => {

    const onClickSubNavHandler = (path) =>{
        setViewNav(path)
    }

    return (
        <nav>
            {
                navSubSellerTopData.map(subNav => <button onClick={()=>onClickSubNavHandler(subNav.path)} key={subNav.path}>{subNav.name}</button>)
            }
        </nav>
    );
};

export default NavSellerSubTop;