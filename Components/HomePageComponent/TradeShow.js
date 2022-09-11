import Image from 'next/image';
import React from 'react';
import HomeSt from "./homeStyle.module.css";
import { tradeShow } from '../../DataSetStatic/HomePage/data_home';
import NavLink from "next/link";

const TradeShow = () => {
    return (
        <section className='baseContainer' style={{textAlign:"center"}}>
            <h2>Visit our Trade Shows</h2>
            <div className={HomeSt.tradeShow_wrapper}>
                {
                    tradeShow.map(show =>  <div className={HomeSt.tradeShow_card} key={show.trade_slug}>
                        <NavLink href={show.trade_slug}>
                        <div style={{cursor:"pointer"}}>
                            <Image src={show.img}  width={200} height={200} alt={show.trade_name}></Image>
                        </div>
                        </NavLink>
                        <NavLink href={show.trade_slug}>
                            <h4 style={{cursor:"pointer"}}>{show.trade_name}</h4>
                        </NavLink>
                    </div>

                    
                    )
                }
            </div>
        </section>
    );
};

export default TradeShow;