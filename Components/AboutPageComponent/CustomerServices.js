import Image from 'next/image';
import React, { useState } from 'react';
import { customerStaticSevices } from '../../DataSetStatic/AboutUsPage/aboutUSdata';

const CustomerServices = () => {
    const [activeService,setActiveService] = useState("");
    return (
        <div>
            <h1>We Provide Continuous & Kind Service for Customers</h1>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem"}}>
                <div>
                    {
                        customerStaticSevices.map((service,idx) => <div key={service.service_name}>
                            <h3 onClick={()=>setActiveService(`${idx}-${service.service_name}`)} style={{ display:"flex",justifyContent:"space-between",cursor:"pointer"}}>{service.service_name}  <span>{activeService === `${idx}-${service.service_name}` ? "-" : "+"}</span></h3>
                            <div style={{height:activeService === `${idx}-${service.service_name}` ? "auto" : "0", overflow:"hidden"}}>
                                <p>{service.description}</p>
                            </div>
                        </div>)
                    }
                </div>
                <div>
                    <Image src={"/assest/images/pages/about_us/2.jpg"} width={800} height={500} alt="Not Found"></Image>
                </div>
            </div>
        </div>
    );
};

export default CustomerServices;