import React from 'react';

const ProductDescription = ({details,video,title}) => {
    // console.log(details);
    return (
        <div>
            <h2>Details</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 200px"}}>
                <div>
                    <div>
                        {
                            details.description.map((detail,idx)=><p key={`detail-${idx}`}>{detail}</p>)
                        }
                    </div>
                    <div>
                        <ul>
                            {
                                details.highlights.map((highlight,idx)=><li key={`highlight-${idx}`}>{highlight}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <iframe width="400" height="230" src={video} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </div>
            </div>
            <div>
                <ol style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2rem"}} type='1'>
                    {
                        details.special_offers.map((offer,idx)=><div key={`offer-${idx}`}>
                            <li>
                                <h4>{offer.offer_name}</h4>
                                <p>{offer.offer_details}</p>
                            </li>
                        </div>)
                    }
                </ol>
            </div>
        </div>
    );
};

export default ProductDescription;