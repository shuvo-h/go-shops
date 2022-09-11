import React from 'react';
import { home_pageInfoCard } from '../../DataSetStatic/HomePage/data_home';
import { getSVGicons, icons } from '../../utils/client_utils/icons/getSVGIcons';
import homeST from './homeStyle.module.css';

const HomeInfoCard = () => {
    return (
        <section className={`baseContainer verticalCenterEL ${homeST.homeInfoCard}`}>
            
                {
                    home_pageInfoCard.map(paper => <div className={`centerEL`} key={paper.title}>
                        <div>{getSVGicons(paper.icon)}</div>
                        <div >
                            <h5 className='m-0'>{paper.title}</h5>
                            <p className='m-0'>{paper.info}</p>
                        </div>
                    </div>)
                }
            
        </section>
    );
};

export default HomeInfoCard;