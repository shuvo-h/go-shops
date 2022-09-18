import React from 'react';
import NavLink from 'next/link';
import { useRouter } from 'next/router';


const menuListDemo = [
    {serial:1,title:"acv",path:"/"},
    {serial:2,title:"acv",path:"/"},
]

const SubPageMenuList = ({menuList}) => {
    const router = useRouter();
    // console.log();
    return (
        <div style={{display:"flex", borderBottom:"1px solid rgb(238,238,238)", margin:"10px auto"}}>
            {
                menuList.map(list => <div key={list.serial}>
                    {
                        router.pathname === list.path 
                        ? <div>
                            <a>{list.title}</a>
                        </div>
                        :  <div style={{paddingBottom:"12px"}}>
                            <NavLink href={list.path} >
                                <a style={{color:"#545352"}}>{list.title}</a>
                            </NavLink>
                            <span> &gt; </span>
                        </div>
                    }
                   
                </div>)
            }
        </div>
    );
};

export default SubPageMenuList;