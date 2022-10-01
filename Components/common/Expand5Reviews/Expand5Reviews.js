import React from 'react';
import { Rating } from 'react-simple-star-rating';

const Expand5Reviews = (reviewObj,option={size:20,allowHalfIcon:true}) => {
    return (
        <div>
            {
                Object.entries(reviewObj?reviewObj:{}).map(typeRev =><div style={{display:"grid", gridTemplateColumns:"110px 1fr"}} key={typeRev[0]}>
                    <div>
                        <Rating  ratingValue={20 * parseFloat(typeRev[1])}  readonly = {true} size={option.size} allowHalfIcon={option.allowHalfIcon} />
                    </div>
                    <div style={{display:"grid", gridTemplateColumns:"30px 1fr"}}>
                        <p style={{margin:"0"}}>{parseFloat(typeRev[1]).toFixed(1)}</p>
                        <p style={{margin:"0"}}>{typeRev[0]}</p>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Expand5Reviews;