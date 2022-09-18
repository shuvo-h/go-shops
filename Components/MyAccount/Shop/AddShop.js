import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const socialLinksInitial = [
    {name:"facebook",url:"",placeholder:"Insert facebook URL"},
    {name:"twitter",url:"",placeholder:"Insert Twitter URL"},
    {name:"linkedIn",url:"",placeholder:"Insert LinkedIn URL"},
    {name:"youtube",url:"",placeholder:"Insert Instagram URL"},
    {name:"Instagram",url:"",placeholder:"Insert Youtube URL"},
]
const openingHoursInitial = [
    {day:"saturday", from:"08:00", to:"22:00"},
    {day:"sunday", from:"08:00", to:"22:00"},
    {day:"monday", from:"08:00", to:"22:00"},
    {day:"tuesday", from:"08:00", to:"22:00"},
    {day:"wednesday", from:"08:00", to:"22:00"},
    {day:"thursday", from:"08:00", to:"22:00"},
    {day:"friday", from:"08:00", to:"22:00"},
]
const AddShop = () => {
    const user = useSelector(({User})=>User.user);
    const router = useRouter();
    const [openingHours,setOpeningHours] = useState(openingHoursInitial);
    const [socialLinks,setSocialLinks] = useState(socialLinksInitial);
    const [shippingMethods,setShippingMethods] = useState([]);
    const [shopInfo,setShopInfo] = useState({address:{},store_location:{}});
    const [isStoreLoading,setIsStoreLoading] = useState(false);
console.log(user);
    
    const onChangeShopInfo = (e,actionType) =>{
        switch (actionType) {
            case "address":
                setShopInfo(pre=>{
                    const tempInfo = {...pre};
                    tempInfo['address'][e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;

            case "social":
                setSocialLinks(pre=>{
                    const tempInfo = [...pre];
                    const newSocialLinks = socialLinks.map(social=>{
                        if (social.name === e.target.name) {
                            social.url = e.target.value;
                        }
                        return social;
                    })
                    return newSocialLinks;
                })
                break;

            case "openingHourFrom":
                setOpeningHours(pre=>{
                    const tempInfo = [...pre];
                    const newOpeningHours = tempInfo.map(opening=>{
                        if (opening.day === e.target.name) {
                            opening.from = e.target.value;
                        }
                        return opening;
                    })
                    return newOpeningHours;
                })
                break;
            case "openingHourTo":
                setOpeningHours(pre=>{
                    const tempInfo = [...pre];
                    const newOpeningHours = tempInfo.map(opening=>{
                        if (opening.day === e.target.name) {
                            opening.to = e.target.value;
                        }
                        return opening;
                    })
                    return newOpeningHours;
                })
                break;

            case "shippingMethod":
                if (e.key === "Enter" || e.key === 13) {
                    const tempInfo = [...shippingMethods, e.target.value];
                    setShippingMethods(tempInfo);
                    e.target.value = "";
                }
                break;

            case "mapLocation":
                setShopInfo(pre=>{
                    const tempInfo = {...pre};
                    tempInfo['store_location'][e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
        
            default:
                setShopInfo(pre=>{
                    const tempInfo = {...pre};
                    tempInfo[e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
        }
    }


    const handleStoreSubmit = (e) =>{
        e.preventDefault();
        setIsStoreLoading(true);
        const openingTimeOrg = openingHours.map(day=>Object.entries(day)).map(el =>{
            const tempH = {};
            tempH[el[0][1]] = `${el[1][1]} - ${el[2][1]}`;
            return tempH;
        }).map(item=>Object.entries(item)[0])

        const newStore = {
            ...shopInfo,
            shipping_method: shippingMethods,
            // opening_hours: openingHours
            opening_hours: Object.fromEntries(openingTimeOrg),
            owner: user._id
        }
        
        fetch("/api/shops/shop",{
            method:"POST",
            headers:{"content-type":"application/json","Authorization":`Bearer ${user.token}`},
            body: JSON.stringify(newStore)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data?.data?._id) {
                alert("Store added successfully!");
                router.push("/my-account")
            }else{
                if (data.error) {
                    alert("Something went wrong. Please try again");
                }
            }
            setIsStoreLoading(false);
        }).catch(err=>{
            setIsStoreLoading(false);
            alert(err.message);
        })
    }
    return (
        <div>
            <h2>Add a Shop</h2>
            <div>
                <form onSubmit={handleStoreSubmit}>
                    <div>
                        <p>Shop Name:</p>
                        <input onChange={(e)=>onChangeShopInfo(e)} name='shop_name' type="text"  placeholder='write the shop name' />
                    </div>
                    <div>
                        <p>Banner Url(file in future):</p>
                        <input onChange={(e)=>onChangeShopInfo(e)} name='banner'  type="url" placeholder='Banner URL link' />
                    </div>
                    <div>
                        <p>Brand Url(file in future):</p>
                        <input onChange={(e)=>onChangeShopInfo(e)} name='brand' type="url" placeholder='Brand Logo URL' />
                    </div>
                    <div>
                        <div>
                            <p>Location:</p>
                            <input onChange={(e)=>onChangeShopInfo(e,"address")} name='location' type="text" placeholder='Location of the Shop' />
                        </div>
                        <div>
                            <p>Phone:</p>
                            <input  onChange={(e)=>onChangeShopInfo(e,"address")} name='phone'  type="text" placeholder='Shop phone number' />
                        </div>
                        <div>
                            <p>Email:</p>
                            <input  onChange={(e)=>onChangeShopInfo(e,"address")} name='contact_email' type="email" placeholder='Shop email address' />
                        </div>
                    </div>
                    <div>
                        {
                            socialLinks.map(social =><div key={social.name}>
                                <p>{social.name}</p>
                                <input onChange={(e)=>onChangeShopInfo(e,"social")} name={social.name} type="url" value={social.url} placeholder={social.placeholder} />
                            </div>)
                        }
                    </div>
                    
                    <div>
                        {
                            openingHours.map(dayInfo =><div key={dayInfo.day}>
                                <p>{dayInfo.day}</p>
                                <div>
                                    <div>
                                        <p>From</p>
                                        <input onChange={(e)=>onChangeShopInfo(e,"openingHourFrom")} name={dayInfo.day} type="time" placeholder={dayInfo.placeholder} value={dayInfo.from} />
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <input onChange={(e)=>onChangeShopInfo(e,"openingHourTo")} name={dayInfo.day} type="time" placeholder={dayInfo.placeholder} value={dayInfo.to}/>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                    <div>
                        <div>
                            {
                                shippingMethods.map(way=> <p key={way}>{way}</p>)
                            }
                        </div>
                        <div>
                            <input onKeyDown={(e)=>onChangeShopInfo(e,"shippingMethod")} type="text" placeholder='add a shipping Method' />
                        </div>
                    </div>
                    <div>
                        <p>Store Location</p>
                        <input onChange={(e)=>onChangeShopInfo(e,"mapLocation")} name='lat'  type="number" placeholder='latitude '/>
                        <input onChange={(e)=>onChangeShopInfo(e,"mapLocation")} name='lang'  type="number" placeholder='longitude'/>
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddShop;