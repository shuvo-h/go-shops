import Image from 'next/image';
import React from 'react';
import NavLink from 'next/link';
import { Rating } from 'react-simple-star-rating'
import { getSVGicons, icons } from '../../utils/client_utils/icons/getSVGIcons';


const ShopBanner = ({shop}) => {

    return (
        <div style={{backgroundImage:`url(${shop.banner})`, backgroundSize:"100% 100%", borderRadius:"10px", overflow:"hidden"}}>
            <div style={{minHeight:"350px"}}></div>
            <div style={{display:"flex",justifyContent:"space-between", gap:"2rem",backgroundColor:"rgba(0,0,0,0.8)", color:"white"}}>
                <div style={{position:"relative",display:"flex", alignItems:"center"}}>
                    <div style={{position:"absolute", top:"-50px", right:"15px", borderRadius:"50%", overflow:"hidden"}}>
                        <Image src={shop.brand} width={80} height={80} alt={shop.shop_name}></Image>
                    </div>
                    <div>
                        <Rating 
                            ratingValue={20 * shop.review} 
                            readonly = {true}
                            size={25}
                        />
                    </div>
                </div>
                <div style={{flexGrow:"1"}}>
                    <h4 style={{margin:"4px 0"}}>{shop.shop_name}</h4>
                    <p style={{margin:"2px 0"}}>{shop.address.road}, {shop.address.city}, {shop.address.state}, {shop.address.country}</p>
                    <p style={{margin:"2px 0"}}>icon: {shop.address.phone}</p>
                    <p style={{margin:"2px 0"}}>icon: {shop.address.contact_email}</p>
                </div>
                <div>
                    <button style={{margin:"15px auto", display:"block"}}>INQUIRE</button>
                    <div>
                        {
                            Object.entries(shop.social_profile ? shop.social_profile : []).map((social,idx)=>{
                                if (social[0].toLocaleLowerCase()==='facebook') {
                                    return <NavLink href={social[1]} key={`social-${idx}`}><a>{getSVGicons(icons.fbIcon,30,30)}</a></NavLink>
                                }else if (social[0].toLocaleLowerCase()==='twitter') {
                                    return <NavLink href={social[1]} key={`social-${idx}`}><a>{getSVGicons(icons.twitterIcon,30,30)}</a></NavLink>
                                }else if (social[0].toLocaleLowerCase()==='linkedin') {
                                    return <NavLink href={social[1]} key={`social-${idx}`}><a>{getSVGicons(icons.twitterIcon,30,30)}</a></NavLink>
                                }else if (social[0].toLocaleLowerCase()==='youtube') {
                                    return <NavLink href={social[1]} key={`social-${idx}`}><a>{getSVGicons(icons.youtubeIcon,30,30)}</a></NavLink>
                                }else if (social[0].toLocaleLowerCase()==='instagram') {
                                    return <NavLink href={social[1]} key={`social-${idx}`}><a>{getSVGicons(icons.instagramIcon,30,30)}</a></NavLink>
                                }else{
                                    return <div key={`social-${idx}`}></div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopBanner;