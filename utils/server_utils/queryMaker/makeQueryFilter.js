// make mongoDB address filter query format, queryObject = {city:"gazipur",country:"bangladesh",state:"dhaka"}
export const filterAddressQueryFormatter = (queryObject) =>{
    // delete emty query property
    Object.keys(queryObject).forEach(key=> !queryObject[key] && delete queryObject[key]);
    
    // make regex mongoDB query
    const builtQueryArray = Object.entries(queryObject).map(entry =>{
        const tempQ = {};
        tempQ[`address.${entry[0]}`] = {$regex:entry[1],$options:'i'};
        return tempQ
    })
    const builtQuery = Object.assign({},...builtQueryArray);
    console.log(builtQuery);
    return builtQuery;
}

