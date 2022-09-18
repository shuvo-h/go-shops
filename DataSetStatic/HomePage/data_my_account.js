import { icons } from "../../utils/client_utils/icons/getSVGIcons"

export const my_account_pageMeta = {
    title:"My Account",
    author:"", 
    keywords: [], 
    description:"", 
    baseURL:""
}

export const myAccounSideNav = [
    {title:"Dashboard", path:"/dashboard"},
    {title:"Orders", path:"/orders"},
    {title:"Downloads", path:"/downloads"},
    {title:"Addresses", path:"/addresses"},
    {title:"Account details", path:"/account-details"},
    {title:"Wishlist", path:"/wishlist"},
    {title:"Logout", path:"/logout"},

    {title:"Shop", path:"/my-account/shop"},
]


export const myAccounViewAreaData = [
    {title:"orders", path:"orders",icon: icons.orderListIcon},
    {title:"downloads", path:"downloads",icon: icons.downloadIcon},
    {title:"addresses", path:"addresses",icon: icons.addressIcon},
    {title:"Account Details", path:"account-details",icon: icons.accountDetailsIcon},
    {title:"wishlist", path:"wishlist",icon: icons.heartIcon},
    {title:"logout", path:"/",icon: icons.logoutIcon},
]

