import React from 'react';
import NavLink from 'next/link';

const NavBarLink = ({children,slug}) => {
    return (
        <NavLink href={slug}>
            {children}
        </NavLink>
    );
};

export default NavBarLink;