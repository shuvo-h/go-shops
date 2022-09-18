// get filtered sellers
// baseQueryUrl= "http://localhost:3000/api/users", filterOption={email:"ab@gmail.com",phone:45781}
export const getFilteredSellers = async(baseQueryUrl,filterOption,page=0,count=2) =>{
    // console.log(filterOption,page,count);
    // make query url
    const queryString = `?page=${page}&count=${count}&`;
    Object.entries(filterOption).map(query =>{
        queryString += `${query[0]}=${query[1]}&`
    });
    console.log(queryString.slice(0,-1));
    try {
        
        // const sellersRes = await fetch(`http://localhost:3000/api/users${queryString.slice(0,-1)}`);
        const sellersRes = await fetch(`${baseQueryUrl}${queryString.slice(0,-1)}`);
        const sellers = await sellersRes.json();
        return sellers;
        
    } catch (error) {
        return {error:true,message:error.message, data:[]}
    }
}

