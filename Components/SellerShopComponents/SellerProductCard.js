import Image from 'next/image';
import React from 'react';
import NavLink from 'next/link';
import { useRouter } from 'next/router';

const productSortOptions = [
    {name:"Default sorting",filterQuery:""},
    {name:"Sort by popularity",filterQuery:"-total_sold"},
    {name:"Sort by rating",filterQuery:"-review_avg"},
    {name:"Sort by latest",filterQuery:"-createdAt"},
    {name:"Sort by price: low to high",filterQuery:"active_price"},
    {name:"Sort by price: high to low",filterQuery:"-active_price"},
]

const SellerProductCard = ({productlist}) => {
    // console.log(productlist,"server to page");
    const router = useRouter();

    const onChangeSortHandler = (sortQuery) =>{
       router.push({pathname: router.pathname,query:{...router.query,sort:sortQuery,page:1}},undefined,{shallow:false,scroll:false})
    }
    const onChangeLimitHandler = (pageLimit) =>{
       router.push({pathname: router.pathname,query:{...router.query,limit:pageLimit,page:1}},undefined,{shallow:false,scroll:true})
    }
   
    
    return (
        <section>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                    <p>Sort By:</p>
                    <select onChange={(e)=>onChangeSortHandler(e.target.value)} name="" id="">
                        {
                            productSortOptions.map(sortOpt => <option value={sortOpt.filterQuery}  key={sortOpt.name}>{sortOpt.name}</option>)
                        }
                    </select>
                </div>
                <div>
                        <select onChange={(e)=>onChangeLimitHandler(e.target.value)} defaultValue={router.query.limit ? router.query.limit : 3} name="" id="">
                            {
                                [2,3,5,9,12,24,36].map(pageLimit =><option value={pageLimit} key={pageLimit}>{pageLimit}</option>)
                            }
                        </select>
                </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
                {
                    productlist?.data?.map(product=> <NavLink href={`/product/${product._id}`} key={product._id} passHref={true}>
                        <a>
                            <div style={{border:"1px solid"}}>
                                <div><Image src={product.img[0]} width={800} height={500} alt="Not Found"></Image></div>
                                <p>{product.title}</p>
                                <p>rev</p>
                                <h5>${product.active_price} <span><s>{product.price[0]?.price && `$${product.price[0]?.price}`}</s></span></h5>
                            </div>
                        </a>
                    </NavLink>)
                }
            </div>
            <div>
                {
                   productlist?.pages > 1 && Array.from(Array(productlist?.pages).keys())?.map(button => <NavLink href={{pathname:router.pathname,query:{...router.query,page:button+1}}} key={button}><a style={{border:"1px solid", padding:"2px", margin:"3px"}}>{button+1}</a></NavLink>)
                }
            </div>
        </section>
    );
};

export default SellerProductCard;