import React, { useEffect, useState } from 'react';
import { DOTS, usePaginationButton } from './usePaginationButton';


const usePagination = (baseQueryURL) => {
    const [queryData,setQueryData] = useState([]);
    const [totalCount,setTotalCount] = useState(2);
    const [searchQuery,setSearchQuery] = useState({});
    const [currentPage,setCurrentPage] = useState(1);
    const [perPage,setPerPage] = useState(4);
    const [totalPages,setTotalPages] = useState(1);

    useEffect(()=>{
        // returned response must be : {count:1047,data:[],errors:{status:false,messages:{common:""}}}
        const fetchQueryDataBasedPages = async() =>{
            // const fetchedData=  await getFilteredData("/api/users",{...searchQuery},currentPage,perPage);
            const fetchedData=  await getFilteredData(baseQueryURL,{...searchQuery},currentPage,perPage);
            // setCurrentPage(1);
            setQueryData(fetchedData.data?.length ? fetchedData.data : []);
            setTotalCount(fetchedData.count ? fetchedData.count : 0);
            const newTotalPages = Math.ceil(fetchedData.count/perPage) > 0 ? Math.ceil(fetchedData.count/perPage) : 1;
            setTotalPages(newTotalPages);
        };
        fetchQueryDataBasedPages();
    },[baseQueryURL,searchQuery,currentPage,perPage])
    
    const paginationProps = {
        totalCount: totalCount > 0 ? totalCount : 0,
        pageSize: perPage > 0 ? perPage : 10,
        siblingCount: 3,
        currentPage: currentPage ? currentPage:1
    }
    const paginationRange  =  usePaginationButton(paginationProps);

    const displayPageNumbers = () =>{
        // If there are less than 2 times in pagination range we shall not render the component
        if (currentPage === 0 || paginationRange?.length < 2) {
            return null;
        }
        const onNext = () => setCurrentPage(currentPage + 1);
        const onPrevious = () => setCurrentPage(currentPage - 1);
        let lastPage = paginationRange[paginationRange?.length - 1];
     

        return (
            <div>
                <button  style={{backgroundColor:currentPage===1 ? "lightblue": "lightgray", border:"none",margin:"2px 2px",padding:"8px 15px"}} onClick={()=>setCurrentPage(currentPage - 1)} disabled={currentPage === 1 ? true: false}> pre </button>
                {
                    paginationRange.map((pageNumber,idx)=>{
                        // If the pageItem is a DOT, render the DOTS unicode character
                        if (pageNumber === DOTS) {
                            return <button key={`${pageNumber}- ${idx}`}>&#8230;</button>;
                        }
                        return <button style={{backgroundColor:currentPage===pageNumber ? "lightblue": "lightgray", border:"none",margin:"2px 2px",padding:"8px 15px"}} onClick={()=>setCurrentPage(pageNumber)} key={`${pageNumber}- ${idx}`}>{pageNumber}</button>;
                    })
                }
                
                <button style={{backgroundColor:currentPage===lastPage ? "lightblue": "lightgray", border:"none",margin:"2px 2px",padding:"8px 15px"}} onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === lastPage ? true: false}> next </button>
            </div>
        ) 
    }
    
    return {
        displayPageNumbers,
        setSearchQuery,
        setPerPage,
        setCurrentPage,
        searchQuery,
        totalPages,
        queryData,
        totalCount,
        pageSize: perPage,
        currentPage
    };
};

export default usePagination;




// get filtered data
// baseQueryUrl= "http://localhost:3000/api/users", filterOption={email:"ab@gmail.com",phone:45781}
export const getFilteredData = async(baseQueryUrl,filterOption,page=1,count=2) =>{

    // console.log(page,count,"in fb pagi");
    // make query url
    const queryString = `?page=${page}&limit=${count}&`;
    Object.entries(filterOption).filter(el=>el[1].length).map(query =>{
        queryString += `${query[0]}=${query[1]}&`
    });
    // console.log(queryString.slice(0,-1));
    try {
        
        // const sellersRes = await fetch(`http://localhost:3000/api/users${queryString.slice(0,-1)}`);
        const sellersRes = await fetch(`${baseQueryUrl}${queryString.slice(0,-1)}`);
        const sellers = await sellersRes.json();
        // console.log(sellers);
        return sellers;
        
    } catch (error) {
        return {errors:{status:false,messages:{common:""}}, data:[]}
    }
}

