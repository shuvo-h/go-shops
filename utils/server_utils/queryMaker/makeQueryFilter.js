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
    // console.log(builtQuery);
    return builtQuery;
}


/*
    const mainQuery = req.query;
    const operatorKeys = ['review','amount','price','age'];
*/

export const filterOperatorFormatter = (mainQuery={},operatorKeys=[]) =>{
    /*
        // manageing sort(this logic doesn't work in NextJS. It works in NodeJS, not NextJS)
        const filteredString = JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
        filters = JSON.parse(filteredString);
    */
   const tempMainQuery = {...mainQuery}
   // delete unnecessary query except operator related queries
   Object.keys(tempMainQuery).forEach(key=> operatorKeys.indexOf(key) < 0 && delete tempMainQuery[key]);
    // convert operator filter command
    const operatorFilterArr = Object.entries(tempMainQuery).map(operatorObj=>{
        const tempQueries = operatorObj[1]?.split(",").map(opEl=>{
            const filterKeyVal =opEl?.split("~")
            return {[`$${filterKeyVal[0]}`]:filterKeyVal[1]}
        })
        return {[operatorObj[0]]:Object.assign({},...tempQueries)} 
    })
    // convert array of obj to single obj
    const operatorsFilter = Object.assign({},...operatorFilterArr);
    return operatorsFilter;
}

// format nested filter command
/*
    const mainQuery = req.query;
    const nestedKeys = ['road','city','state','country'];
    const filterKey = "address"
    return {'address.state': { '$regex': 'kHuLna', '$options': 'i' },'address.city': { '$regex': 'naraIL', '$options': 'i' },}
*/
export const filterNestedFormatter = (mainQuery={},nestedKeys=[],filterKey="",exactMatchRegex=true) =>{
    const tempMainQuery = {...mainQuery}
    // delete unnecessary query except operator related queries
    Object.keys(tempMainQuery).forEach(key=> nestedKeys.indexOf(key) < 0 && delete tempMainQuery[key]);

    // make regex mongoDB query
    const builtQueryArray = Object.entries(tempMainQuery).map(entry =>{
        const filterWithRegex = {[`${filterKey}.${entry[0]}`]: {$regex:entry[1],$options:'i'}};
        const filterWithoutRegex = {[`${filterKey}.${entry[0]}`]: entry[1]}
        return exactMatchRegex ? filterWithRegex : filterWithoutRegex
        
    })
    const builtQuery = Object.assign({},...builtQueryArray);
    return builtQuery;
}

// const mainQuery = req.query;
export const calculatePaginationFields = (mainQuery) =>{
    const reqQuery = {...mainQuery};
    const queries = {skip:0,limit:10};

    // sorting of the docs array
    if (reqQuery.sort) {
        const sortBy = reqQuery.sort?.split(",").join(" ");
        queries.sortBy = sortBy;
    }

    // returned fields of the doc
    if (reqQuery.fields) {
        const fields = reqQuery.fields?.split(",").join(" ");
        queries.fields = fields;
    }

    // page count and limit
    if (reqQuery.page || reqQuery.limit) {
        const {page=1,limit=0} = reqQuery;
        const skip = ((page>0 ? page : 1) -1) * Number(limit);
        queries.skip = skip;
        queries.limit = parseInt(limit); 
    }
    // console.log(queries);
    return queries;
}

/*
const db = {
    price: [{priceValue:10},{priceValue:18},]
}
    mainQuery = req.query,
    mainKeys = ['price'],
    fixindex = 0,
    nestedKeys = 'priceValue'
*/
// filters["price.0.price"] =  {$gt:500 }
export const filterOperator_specificIdxEl_fromArrOfObj = (mainQuery,mainKeys,fixIndex,nestedKey) =>{
    const reqQuery = {...mainQuery};
    // delete unnecessary query except operator related queries
    Object.keys(reqQuery).forEach(key=> mainKeys.indexOf(key) < 0 && delete reqQuery[key]);
    
    // convert operator filter command
    const operatorFilterArr = Object.entries(reqQuery).map(operatorObj=>{
        const tempQueries = operatorObj[1]?.split(",").map(opEl=>{
            const filterKeyVal =opEl?.split("~")
            return {[`$${filterKeyVal[0]}`]:filterKeyVal[1]}
        })
        return {[`${operatorObj[0]}.${fixIndex}.${nestedKey}`]:Object.assign({},...tempQueries)} 
        
    })
    // convert array of obj to single obj
    const operatorsFilter = Object.assign({},...operatorFilterArr);
    return operatorsFilter;
}


// make search query for specific list of fields 
// const mainQuery = req.query; const searchKeyList = ["name","description","category"]
export const searchRegexCMDgenerator = (mainQuery={},searchKeyList=[""]) =>{
    const searchString= mainQuery.search;
    if (searchString && searchKeyList.length) {
        // generate search command
        const searchCMD = searchKeyList.map(keyEl=>{
            return {[keyEl]:{$regex:searchString,$options:"ig"}}
        })
        // console.log(searchCMD);
        // {$or:[{title:{$regex:"full pant",$options:"ig"}},{"details.description":{$regex:"full pant",$options:"ig"}}],}
        return {$or:searchCMD}
    }else{
        return {}
    }
}
  

