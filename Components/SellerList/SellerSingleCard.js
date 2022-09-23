import Image from 'next/image';
import React from 'react';
import NavLink from 'next/link';
import { Rating } from 'react-simple-star-rating'

const SellerSingleCard = ({seller}) => {
    
    return (
        <div style={{border:"1px solid lightgrey", color:"white"}}>
            <div style={{border:"1px solid lightgrey", padding:"1em 1em", backgroundImage:`url(${seller.banner})`, backgroundSize:"100% 100%"}}>
                <h4 style={{margin:"10px 0"}}>{seller.shop_name}</h4>
                <Rating 
                    ratingValue={20 * seller.review} 
                    readonly = {true}
                    size={25}
                />
                <p style={{margin:"0"}}>{seller.address.contact_email}</p>
                <p style={{margin:"0"}}>{seller.address.phone}</p>
            </div>
            <div style={{position:"relative",minHeight:"50px"}}>
                <button style={{border:"none",backgroundColor:"#eee",padding:"0.8em 1.5em", margin:"30px 5px"}}>INQUIRY</button>
                <NavLink href={`/sellers/${seller.slug}`}><a style={{border:"none",backgroundColor:"#eee",padding:"0.8em 1.5em", margin:"30px 5px",color:"black"}}>VISIT</a></NavLink>
                <div style={{position:"absolute", bottom:"50px", right:"15px", borderRadius:"50%", overflow:"hidden"}}>
                    <Image src={seller.brand} width={80} height={80} alt="Not Found"></Image>
                </div>
            </div>
        </div>
    );
};

export default SellerSingleCard;