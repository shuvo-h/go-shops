import React from 'react';
import { useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { IconContext } from "react-icons";
import STmainLayout from "../mainLayout.module.css";

const NavSearch = () => {

    // const categories = useSelector(({Home}) => Home.categories.find(ctg =>ctg.category_type === "main")?.category);
    const mainCategories = useSelector(({Home}) => Home.categories);
    // console.log(mainCategories);
    

    return (
        <div className={`centerEL ${STmainLayout.middleNave_search_container}`}>
            <div className={`centerEL ${STmainLayout.middleNave_search_wrapper}`}>
                <div>
                    <select name="" id="">
                        <option value="all">All Categories</option>
                        {
                            mainCategories?.map(category => <option value={category?.category} key={category?.category}>{category?.category}</option>)
                        }
                    </select>
                </div>
                <div className={STmainLayout.search_input_wrap}>
                    <input type="text" placeholder='Search in...' />
                </div>
                <IconContext.Provider value={{ color: "blue", className: `global-class-name ${STmainLayout.search_input_icon}` }}><BsSearch /></IconContext.Provider>
            </div>
        </div>
    );
};

export default NavSearch;