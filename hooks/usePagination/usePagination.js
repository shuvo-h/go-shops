import React, { useEffect, useState } from 'react';

const usePagination = (baseQueryURL) => {
    const [queryData,setQueryData] = useState([]);
    const [totalCount,setTotalCount] = useState(2);
    const [searchQuery,setSearchQuery] = useState({});
    const [currentPage,setCurrentPage] = useState(0);
    const [perPage,setPerPage] = useState(3);
    const [totalPages,setTotalPages] = useState(2);
    // console.log(currentPage);

    useEffect(()=>{
        // returned response must be : {count:1047,data:[],errors:{status:false,messages:{common:""}}}
        const fetchQueryDataBasedPages = async() =>{
            // const fetchedData=  await getFilteredData("/api/users",{...searchQuery},currentPage,perPage);
            const fetchedData=  await getFilteredData(baseQueryURL,{...searchQuery},currentPage,perPage);
            // console.log(fetchedData);
            setQueryData(fetchedData.data?.length ? fetchedData.data : []);
            setTotalCount(fetchedData.count ? fetchedData.count : 0);
            const newTotalPages = Math.ceil(fetchedData.count/perPage) > 0 ? Math.ceil(fetchedData.count/perPage) : 1;
            setTotalPages(newTotalPages);
        };
        fetchQueryDataBasedPages();
    },[baseQueryURL,searchQuery,currentPage,perPage])

    const displayPageNumbers = () =>{
        return (
            <div>
                <button onClick={()=>setCurrentPage(currentPage>0 ? currentPage-1 : 0)}>prev</button>
                {
                    Array.from(Array(totalPages).keys()).map((page,idx)=><button onClick={()=>setCurrentPage(page)}  key={`page-${idx}`}>{page+1}</button>)
                }
                <button onClick={()=>setCurrentPage(currentPage<totalPages ? currentPage +1 : totalPages)}>next</button>
            </div>
        )
    }

    return {
        displayPageNumbers,
        setSearchQuery,
        searchQuery,
        totalPages,
        queryData,
        totalCount
    };
};

export default usePagination;




// get filtered data
// baseQueryUrl= "http://localhost:3000/api/users", filterOption={email:"ab@gmail.com",phone:45781}
export const getFilteredData = async(baseQueryUrl,filterOption,page=0,count=2) =>{

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
        return {errors:{status:false,messages:{common:""}}, data:[]}
    }
}

