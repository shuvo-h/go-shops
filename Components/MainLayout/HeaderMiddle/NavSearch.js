import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSVGicons, icons } from '../../../utils/client_utils/icons/getSVGIcons';
import STmainLayout from "../mainLayout.module.css";

const NavSearch = () => {
    const router = useRouter();
    const [selectedSearch,setSelectedSearch] = useState({});
    // const categories = useSelector(({Home}) => Home.categories.find(ctg =>ctg.category_type === "main")?.category);
    const mainCategories = useSelector(({Home}) => Home.categories);
    
    const onChangeSearchHandler = (e) =>{
        if (e.key === 'Enter' || e.keyCode === 13) {
            router.push({pathname:'/shop',query:{...selectedSearch}})
        }else{
            setSelectedSearch(pre=>{
                const temp = {...pre}
                temp[e.target.name] = e.target.value;
                return temp;
            })
        }
    }
    
// console.log(selectedSearch);
    return (
        <div className={`centerEL ${STmainLayout.middleNave_search_container}`}>
            <div className={`centerEL ${STmainLayout.middleNave_search_wrapper}`}>
                <div>
                    <select onChange={e=>onChangeSearchHandler(e)} name="category" id="">
                        <option value="">All Categories</option>
                        {
                            mainCategories?.map(category => <option value={category?.category} key={category?.category}>{category?.category}</option>)
                        }
                    </select>
                </div>
                <div className={STmainLayout.search_input_wrap}>
                    <input  onKeyDown={e=>onChangeSearchHandler(e)} name='search' type="text" placeholder='Search in...' />
                </div>
                {getSVGicons(icons.accountDetailsIcon,20,20)}
            </div>
        </div>
    );
};

export default NavSearch;