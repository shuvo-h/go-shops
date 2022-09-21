import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import csc from 'countries-states-cities';

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
    const categories = useSelector(state=>state.Home.categories);
// console.log(socialLinks);
    // auto update city state and country
    const countries = csc.getAllCountries();
    const [availableStates,setAvailableStates] = useState([]);
    const [availableCities,setAvailableCities] = useState([]);
    // get list of available states,cities of a country
    useEffect(()=>{
        // find available states
        const countryID = countries.find(ct=>ct.name === shopInfo.address.country);
        const states = countryID?.id ?  csc.getStatesOfCountry(countryID?.id) : [];
        setAvailableStates(states);

        // find available cities
        const stateID = availableStates.find(state=>state.name === shopInfo.address.state);
        const cities = stateID?.id ?  csc.getCitiesOfState(parseInt(stateID.id)) : [];
        setAvailableCities(cities);
    },[shopInfo.address.country,shopInfo.address.state])

    const onChangeShopInfo = (e,actionType) =>{
        switch (actionType) {
            case "address":
                setShopInfo(pre=>{
                    const tempInfo = {...pre};
                    tempInfo['address'][e.target.name] = e.target.value === 'all' ? "" : e.target.value;
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
                    tempInfo[e.target.name] = e.target.value === 'all' ? "" : e.target.value;
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
        // make socila profile url inti arrray
        const newStore = {
            ...shopInfo,
            shipping_method: shippingMethods,
            opening_hours: Object.fromEntries(openingTimeOrg),
            social_profile: Object.fromEntries(socialLinks.map(link =>[link.name,link.url])),
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
                // router.push("/my-account")
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

console.log(shopInfo);

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
                        <p>Category</p>
                        <select onChange={(e)=>onChangeShopInfo(e)} name='category' id="" defaultValue={"all"}>
                            <option value="all">Choose a category</option>
                            {categories.map(ctg=><option value={ctg._id} key={ctg._id}>{ctg.category}</option>)}
                        </select>
                        {/* <input onChange={(e)=>onChangeShopInfo(e)} name='category' type="url" placeholder='Brand Logo URL' /> */}
                    </div>
                    <div>
                        <div>
                            <p>Phone:</p>
                            <input  onChange={(e)=>onChangeShopInfo(e,"address")} name='phone'  type="text" placeholder='Shop phone number' />
                        </div>
                        <div>
                            <p>Email:</p>
                            <input  onChange={(e)=>onChangeShopInfo(e,"address")} name='contact_email' type="email" placeholder='Shop email address' />
                        </div>
                        <div>
                            <p>Road:</p>
                            <input onChange={(e)=>onChangeShopInfo(e,"address")} name='road' type="text" placeholder='Location of the Shop' />
                        </div>
                        <div>
                            <p>Country:</p>
                            <select onChange={(e)=>onChangeShopInfo(e,"address")} name="country" id="">
                                <option value="all" >Choose country...</option>
                                {
                                    countries.map(country => <option value={country.name} key={country.id}>{country.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <p>State:</p>
                            <select onChange={(e)=>onChangeShopInfo(e,"address")} name="state" id="">
                                <option value="all" >Choose state...</option>
                                {
                                    availableStates.map(state => <option value={state.name} key={state.id}>{state.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <p>City:</p>
                            <select onChange={(e)=>onChangeShopInfo(e,"address")} name="city" id="">
                                <option value="all" >Choose state...</option>
                                {
                                    availableCities.map(city => <option value={city.name} key={city.id}>{city.name}</option>)
                                }
                            </select>
                        </div>
                        <div>
                            <p>ZIP:</p>
                            <input onChange={(e)=>onChangeShopInfo(e,"address")} name='zip' type="text" placeholder='Country of the Shop' />
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        {
                            socialLinks.map(social =><div key={social.name}>
                                <p>{social.name}</p>
                                <input onChange={(e)=>onChangeShopInfo(e,"social")} name={social.name} type="url" value={social.url} placeholder={social.placeholder} />
                            </div>)
                        }
                    </div>
                    
                    <div style={{display:"flex"}}>
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