import { getEmailIcon } from "../svgIcons/commonSVGicons";
import { getDoiscoverCard } from "../svgIcons/discoverCard";
import { deliveryTrack, getAccountDetailsIcon, getAddressIcon, getBagIcon, getCompareIcon, getContactSupportIcon, getDownloadIcon, getHeartIcon, getLinkedINIcon, getLogoutIcon, getMoneyBackIcon, getOrderListIcon, getTelePhoneIcon } from "../svgIcons/ecommerce_Icons";
import getFBicon from "../svgIcons/getFBicon";
import instagramIcon from "../svgIcons/instagramIcon";
import { getMasterCard } from "../svgIcons/masterCard";
import pinterestIcon from "../svgIcons/pinterestIcon";
import twitterIcon from "../svgIcons/twitterIcon";
import { getVisaCard } from "../svgIcons/visaCard";
import youtubeIcon from "../svgIcons/youtubeIcon";

export const icons = {
    masterCard: "masterCard",
    discoverCard: "discoverCard",
    visaCard: "visaCard",
    fbIcon: "fbIcon",
    twitterIcon: "twitterIcon",
    instagramIcon: "instagramIcon",
    pinterestIcon: "pinterestIcon",
    youtubeIcon: "youtubeIcon",
    linkedInIcon: "linkedInIcon",
    deliveryTackIcon: "deliveryTrackIcon",
    bagIcon: "bagIcon",
    moneyBackIcon: "moneyBackIcon",
    contactSupportIcon: "contactSupportIcon",
    logoutIcon: "logoutIcon",
    orderListIcon: "orderListIcon",
    downloadIcon: "downloadIcon",
    addressIcon: "addressIcon",
    accountDetailsIcon: "acountDetailsIcon",
    heartIcon: "heartIcon",
    emailIcon: "emailIcon",
    compareIcon: "compareIcon",
    telephoneIcon: "telephoneIcon",
}
export const getSVGicons = (iconName,width,height) =>{
    switch (iconName) {
        // card icons
        case icons.masterCard:  return getMasterCard(width,height);
        case icons.discoverCard: return getDoiscoverCard(width,height);
        case icons.visaCard:  return getVisaCard(width,height);

        // social media icons
        case icons.fbIcon: return getFBicon(width,height);
        case icons.twitterIcon: return twitterIcon(width,height);
        case icons.instagramIcon:  return instagramIcon(width,height);
        case icons.pinterestIcon: return pinterestIcon(width,height);
        case icons.youtubeIcon: return youtubeIcon(width,height);
        case icons.linkedInIcon: return getLinkedINIcon(width,height);
        
            // ecommerce icons
        case icons.deliveryTackIcon:  return deliveryTrack(width,height);
        case icons.bagIcon:  return getBagIcon(width,height);
        case icons.moneyBackIcon:  return getMoneyBackIcon(width,height);
        case icons.contactSupportIcon:  return getContactSupportIcon(width,height);
        case icons.logoutIcon:  return getLogoutIcon(width,height);
        case icons.orderListIcon:  return getOrderListIcon(width,height);
        case icons.downloadIcon:  return getDownloadIcon(width,height);
        case icons.addressIcon:  return getAddressIcon(width,height);
        case icons.accountDetailsIcon:  return getAccountDetailsIcon(width,height);
        case icons.heartIcon:  return getHeartIcon(width,height);
        case icons.compareIcon:  return getCompareIcon(width,height);

        // common icons
        case icons.emailIcon:  return getEmailIcon(width,height);
        case icons.telephoneIcon:  return getTelePhoneIcon(width,height);
    
        default:
            break;
    }
}

