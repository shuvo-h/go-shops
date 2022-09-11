import React from 'react';
import { fashionShow } from '../../DataSetStatic/HomePage/data_home';
import homeST from "./homeStyle.module.css";
import NavLink from "next/link";

const Fashion = () => {
    return (
        <section className='baseContainer' style={{textAlign:"center"}}>
            <h2>Fashion</h2>
            <div className={homeST.fashionShow}>
                <div className={homeST.fashion_zoom}>
                    <div>
                        <NavLink href={"/"} >
                            <>
                                <div style={{backgroundImage:`url(${fashionShow.large_show.background_img})`}}></div>
                                <button>{fashionShow.large_show.title}</button>
                            </>
                        </NavLink>
                    </div>
                </div>
                <div>
                    <div className={homeST.fashion_zoom}>
                        <div>
                            <NavLink href={"/"} >
                                <>
                                    <div className={homeST.small_show1} style={{backgroundImage:`url(${fashionShow.small_show1.background_img})`}}></div>
                                    <button>{fashionShow.small_show1.title}</button>
                                </>
                            </NavLink>
                        </div>
                    </div>
                    <div className={homeST.fashion_zoom}>
                        <div>
                            <NavLink href={"/"} >
                                <>
                                    <div className={homeST.small_show2} style={{backgroundImage:`url(${fashionShow.small_show2.background_img})`}}></div>
                                    <button>{fashionShow.small_show2.title}</button>
                                </>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={homeST.fashion_zoom}>
                    <div>
                        <NavLink href={"/"} >
                            <>
                                <div className={homeST.medium_show} style={{backgroundImage:`url(${fashionShow.medium_show.background_img})`}}></div>
                                <button>{fashionShow.medium_show.title}</button>
                            </>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Fashion;