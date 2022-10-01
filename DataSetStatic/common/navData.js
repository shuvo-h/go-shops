import { getSVGicons, icons } from "../../utils/client_utils/icons/getSVGIcons"

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
            reactIcon: getSVGicons(icons.accountDetailsIcon,20,20)
        },
        {
            title: "Compare",
            reactIcon: getSVGicons(icons.compareIcon,20,20)
        },
        {
            title: "Cart",
            reactIcon: getSVGicons(icons.bagIcon,20,20)
        },
    ]
}

export const mainNavItems = {
    mainnavLinks : [
        {title:"Home", path:"/"},
        {title:"Seller List", path:"/sellers"},
        {title:"Seller Store", path:"/sellers/store"},
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
