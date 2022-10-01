import React from 'react';
import NavLink from 'next/link';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

const priceRanges = [
    {display:"0.00-100.00",queryRange:"gte~0,lt~100"},
    {display:"100.00-300.00",queryRange:"gte~100,lte~300"},
    {display:"300.00-500.00",queryRange:"gte~300,lte~500"},
    {display:"500.00-1000.00",queryRange:"gte~500,lte~1000"},
    {display:"1000.00-1500.00",queryRange:"gte~1000,lte~1500"},
    {display:"1500.00+",queryRange:"gte~1500"},
]


const NavSideShopFilter = ({categories,productVarityList}) => {
    console.log(productVarityList);
    const router = useRouter();
    const [activeSize,setActiveSize] = useState("");
    const [minPrice,setMinPrice] = useState(0);
    const [maxPrice,setMaxPrice] = useState(100);

    const customPriceHandler = () =>{
        router.push({pathname:router.pathname,query:{...router.query,price:`gte~${minPrice},lte~${maxPrice}`}})
    }

    return (
        <div>
            <div>
                <h4>Filter:</h4>
                <NavLink href={{pathname:"/shop",query:{}}} passHref={true} scroll={true} shallow={false}><a style={{display:"block"}}>Clean All</a></NavLink>
            </div>
            <div>
                <h4>All Categories</h4>
                <div>
                    {
                        categories.map((ctg,idx)=> <NavLink href={{pathname:router.pathname,query:{...router.query,category:ctg.category}}} key={`ctg-${idx}`}><a style={{display:"block"}}>{ctg.category}</a></NavLink>)
                    }
                </div>
            </div>
            <div>
                <h4>Price</h4>
                <div>
                    {
                        // priceRanges.map((price,idx)=> <NavLink href={{pathname:"router.pathname",query:{"...router.query,price:price.queryRange"}}} key={`price-${idx}`}><a style={{display:"block"}}>{price.display}</a></NavLink>)
                        priceRanges.map((price,idx)=> <NavLink href={{pathname:router.pathname,query:{...router.query,price:price.queryRange}}} shallow={false} key={`price-${idx}`}><a style={{display:"block"}}>{price.display}</a></NavLink>)
                    }
                </div>
                <div>
                    <input style={{width:"60px",margin:"0 3px"}} onChange={(e)=>setMinPrice(e.target.value)} value={minPrice} type="number" placeholder='$min'/> 
                    <span>-</span>
                    <input style={{width:"60px",margin:"0 3px"}} onChange={(e)=>setMaxPrice(e.target.value)}  value={maxPrice} type="number" placeholder='$max'/>
                    <button onClick={customPriceHandler}>Go</button>
                </div>
            </div>
            <div>
                <h4>Size</h4>
                <div>
                    {
                        // productSizes.map(size => <NavLink href={{pathname:"",query:{}}} passHref={true} scroll={true} shallow={true} key={`size-${size.display}`}><a>{size.display}</a></NavLink>)
                        productVarityList.varity_size?.map(size => <NavLink href={{pathname:router.pathname,query:{...router.query,size:size}}} passHref={true} scroll={false} shallow={false} key={`size-${size}`}>
                            <div onClick={()=>setActiveSize(size)}>
                                <input type="checkbox" onChange={()=>{}} value={size} checked={activeSize === size ? true:false} />
                                <a>{size}</a>
                            </div>
                        </NavLink>)
                    }
                </div>
            </div>
            <div>
                <h4>Brand</h4>
                <div>
                    {
                        productVarityList.brand?.map(brand =><NavLink href={{pathname:router.pathname,query:{...router.query,brand}}} shallow={false} scroll={true} passHref={true} key={brand}><a style={{display:"block"}}>{brand}</a></NavLink>)
                    }
                </div>
            </div>
            <div>
                <h4>Color</h4>
                <div>
                    {
                        productVarityList.varity_color?.map(color =><NavLink href={{pathname:router.pathname,query:{...router.query,color}}} shallow={false} scroll={true} passHref={true} key={color}><a style={{display:"block"}}>{color}</a></NavLink>)
                    }
                </div>
            </div>
        </div>
    );
};

export default NavSideShopFilter;