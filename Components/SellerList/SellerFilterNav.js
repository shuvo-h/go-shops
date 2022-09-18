import React from 'react';
import csc from 'countries-states-cities'
import { useState } from 'react';
import { useEffect } from 'react';
import useDebounce from '../../hooks/useDebaounce/useDebounce';
import { getFilteredSellers } from '../../utils/client_utils/sellerUtils/getSellers';

const SellerFilterNav = ({categories,setSelectOption,selectOption}) => {
    
    const countries = csc.getAllCountries();
    const [availableStates,setAvailableStates] = useState([]);
    const [availableCities,setAvailableCities] = useState([]);
    const {debouncedValue:searchValue,setUnDebouncedValue:setSearchValue} = useDebounce(2000);

    // console.log(searchValue,new Date().getSeconds());

    const selectOptionHandler = (e) =>{
        // console.log(e.target.value);
        switch (e.target.name) {
            case "country":
                setSelectOption(prev =>{
                    const temp = {...prev};
                    temp.state = "";
                    temp.city = "";
                    temp[e.target.name] = e.target.value === 'all' ? "" : e.target.value;
                    return temp;
                })
                break;
            case "state":
                setSelectOption(prev =>{
                    const temp = {...prev};
                    temp.city = "";
                    temp[e.target.name] = e.target.value === 'all' ? "" : e.target.value;
                    return temp;
                })
                break;
        
            default:
                setSelectOption(prev =>{
                    const temp = {...prev};
                    temp[e.target.name] = e.target.value;
                    return temp;
                })
                break;
        }
    }

    // console.log(selectOption);
    // get list of available states of a country
    useEffect(()=>{
        // find available states
        const countryID = countries.find(ct=>ct.name === selectOption.country);
        const states = countryID?.id ?  csc.getStatesOfCountry(countryID?.id) : [];
        setAvailableStates(states);

        // find available cities
        const stateID = availableStates.find(state=>state.name === selectOption.state);
        const cities = stateID?.id ?  csc.getCitiesOfState(parseInt(stateID.id)) : [];
        setAvailableCities(cities);
    },[selectOption.country,selectOption.state])
    
    return (
        <div>
            <div>
                <input onChange={e=>setSearchValue(e.target.value)} type="text" placeholder='Search...' />
            </div>
            <div>
                <h5>Filter By Category</h5>
                <div>
                    <select onChange={(e)=>selectOptionHandler(e)} name="category" id="" defaultValue={"all"}>
                        <option value="all" >Choose category...</option>
                        {
                            categories.map(ctg => <option value={ctg.category}  key={ctg._id}>{ctg.category}</option>)
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5>Filter By Location</h5>
                <div>
                    <select onChange={(e)=>selectOptionHandler(e)} name="country" id="" defaultValue={"all"}>
                        <option value="all" >Choose Location...</option>
                        {
                            countries.map(country => <option value={country.name} key={country.name}>{country.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <select onChange={(e)=>selectOptionHandler(e)} name="state" id="" defaultValue={"all"}>
                        <option value="all" >Choose State...</option>
                        {
                            availableStates.map(state => <option value={state.name}  key={state._id}>{state.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <select onChange={(e)=>selectOptionHandler(e)} name="city" id="" defaultValue={"all"}>
                        {
                            availableCities.length ? <option value="all" >Choose City...</option> : <option value="all" >No city available</option>
                        }
                        
                        {
                            availableCities.map(city => <option value={city.name}  key={city._id}>{city.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <input  onChange={(e)=>selectOptionHandler(e)} name="zip" type="text" placeholder='Search by Zip' />
                </div>
            </div>
        </div>
    );
};

export default SellerFilterNav;

