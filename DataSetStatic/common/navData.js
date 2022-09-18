import { AiOutlineShopping } from 'react-icons/ai';
import { RiScales3Fill } from 'react-icons/ri';
import { BsHeart } from 'react-icons/bs';
import { IconContext } from "react-icons";

export const navData = {
    welcome_message: "WELCOME TO GOSHOP STORE!",
    navLinks:{
        login:{title:"Sign In",path:"/login"},
        register:{title:"Register",path:"/registration"},
    },
    account:{
        accountTitle: "My Account",
    }
}

export const headerMiddleData = {
    logo:{
        path: "/assest/logo/logo.png",
        title:"GoShop logo",
        width: 200,
        height: 75
    },
    contact:{
        title:"Live Chat ",
        phone_number: '0(123)456-789'
    },
    buttons: [
        {
            title: "Wishlist",
            // reactIcon: "BsHeart" // must import from react icons in component
            reactIcon: <IconContext.Provider value={{ size:"20",color: "blue", className: "global-class-name" }}><BsHeart /></IconContext.Provider>
        },
        {
            title: "Compare",
            // reactIcon: "RiScales3Fill" 
            reactIcon: <IconContext.Provider value={{ size:"20",color: "blue", className: "global-class-name" }}><RiScales3Fill /></IconContext.Provider>
        },
        {
            title: "Cart",
            // reactIcon: "AiOutlineShopping" 
            reactIcon: <IconContext.Provider value={{ size:"20",color: "blue", className: "global-class-name" }}><AiOutlineShopping /></IconContext.Provider>
        },
    ]
}

export const mainNavItems = {
    mainnavLinks : [
        {title:"Home", path:"/"},
        {title:"Seller List", path:"/sellers"},
        {title:"Seller Store", path:"/seller-store"},
        {title:"Category", path:"/category"},
        {title:"Shop", path:"/shop"},
        {title:"Product", path:"/product"},
        {title:"My Account", path:"/my-account"},
    ],
    
    track: {
        title:"Track Order",
        path:"/"
    },
    deal:{
        title:"Daily Deals",
        path:"/"
    }
}
