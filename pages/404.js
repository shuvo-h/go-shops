import Image from 'next/image';
import React from 'react';
import MainLayout from '../Components/MainLayout/MainLayout';
import NavLink from "next/link"
import { useState } from 'react';
import { useEffect } from 'react';
const NotFound = () => {
    
    return (
        <MainLayout pageMeta={{title:"Not Found"}}>
            <section className='baseContainer' style={{textAlign:"center",margin:"80px auto"}}>
                <Image src={"/assest/images/pages/404.png"} width={800} height={500} alt="Not Found"></Image>
                <h2> <span style={{color:"#f93"}}>Oops!!!</span> Something Went Wrong Here</h2>
                <p>There may be a misspelling in the URL entered, or the page you are looking for may no longer exist</p>
                <div style={{margin:"50px auto"}}>
                    <NavLink href="/about">
                        <a style={{color:"#fff", border:"none",backgroundColor:"#333", borderRadius:"3px", fontWeight:"500", padding:"1em 1.5em"}}>GO BACK HOME</a>
                    </NavLink>
                </div>
            </section>
        </MainLayout>
    );
};

export default NotFound;