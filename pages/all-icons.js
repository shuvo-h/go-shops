import React from 'react';
import { getSVGicons, icons } from '../utils/client_utils/icons/getSVGIcons';
import { getEmailIcon } from '../utils/client_utils/svgIcons/commonSVGicons';

const AllIcons = () => {
    console.log(icons);
    return (
        <div style={{display:"flex", margin:"2% 10%",flexWrap:"wrap"}}>
            {
                Object.values(icons).map((icon,idx) => <div style={{border:"1px solid lightgrey",margin:"3px", borderRadius:"4px", display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"10px"}} key={icon}>
                    {getSVGicons(icon,30,30)}
                    <div style={{marginTop:"5px"}}>{icon}</div>
                </div>)
            }
        </div>
    );
};

export default AllIcons;