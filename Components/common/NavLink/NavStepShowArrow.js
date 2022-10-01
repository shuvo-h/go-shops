import React from 'react';
import NavLink from 'next/link';
// const stepsNavList = [{name:"Store List", path:"/", disable:true},]


const NavStepShowArrow = ({stepsNavList,navStylesContainer={},navStylesItem={}}) => {
    
    return (
        <nav style={{display:"flex",...navStylesContainer}}>
            {
                stepsNavList?.map(navItem => {
                    if(!navItem.disable ){
                        return <div style={{...navStylesItem}}  key={navItem.name}>
                            <NavLink href={navItem.path} ><a>{navItem.name}</a></NavLink>
                            {navItem.disable ? <></> : <span style={{margin:"0 5px"}}>&gt;</span>}
                        </div>
                    }else{
                        return <div style={{...navStylesItem}} key={navItem.name}>
                            <span>{navItem.name}</span>
                        </div>
                    }
                })
            }
        </nav>
    );
};

export default NavStepShowArrow;