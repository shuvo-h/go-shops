import { IconContext } from "react-icons";
import { BsSearch } from 'react-icons/bs';
import { GrUnorderedList } from 'react-icons/gr';
import { SiShopify } from 'react-icons/si';
import { AiOutlineHome } from 'react-icons/ai';
import { TbHeartRateMonitor, TbHeartbeat, TbShirt } from 'react-icons/tb';


export const getReactIcon = (react_icon_name,size,className) =>{
    
    switch (react_icon_name) {
        case ("AiOutlineHome"):
            return <IconContext.Provider value={{ size:`${size?size:20}`,color: "#3C3C3C", className: `global-class-name ${className}` }}><AiOutlineHome /></IconContext.Provider>

        case ("GrUnorderedList"):
            return <IconContext.Provider value={{ size:`${size?size:20}`,color: "#3C3C3C", className: `global-class-name ${className}` }}><GrUnorderedList /></IconContext.Provider>
            
        case ("TbShirt"):
            return <IconContext.Provider value={{ size:`${size?size:20}`,color: "#3C3C3C", className: `global-class-name ${className}` }}><TbShirt /></IconContext.Provider>

        case ("TbHeartRateMonitor"):
            return <IconContext.Provider value={{ size:`${size?size:20}`,color: "#3C3C3C", className: `global-class-name ${className}` }}><TbHeartRateMonitor /></IconContext.Provider>

        case ("TbHeartbeat"):
            return <IconContext.Provider value={{ size:`${size?size:20}`,color: "#3C3C3C", className: `global-class-name ${className}` }}><TbHeartbeat /></IconContext.Provider>

        default:
            return <IconContext.Provider value={{ color: "#3C3C3C", className: `global-class-name ${className}` }}><SiShopify /></IconContext.Provider>
    }
}