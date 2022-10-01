import Image from 'next/image';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import { Rating } from 'react-simple-star-rating';
import { getSVGicons, icons } from '../../utils/client_utils/icons/getSVGIcons';

const socialShares = [
    {
        icon:icons.fbIcon,
        text:"",
        summary:"",
        pageURL:"",
        imageUrl:"",
        postTitle:"",
        get hrefURL(){
            // add this meta data to the html page to allow facebook to use this info from meta data
            // https://developers.facebook.com/docs/sharing/webmasters#markup
            return `https://www.facebook.com/sharer.php?u=${encodeURI(this.pageURL)}&summary=${encodeURI(this.summary)}&title=${encodeURI(this.postTitle)}&description=${encodeURI(this.text)}&picture=${encodeURI(this.imageUrl)}`
        }
    },
    {
        icon:icons.twitterIcon,
        text:"",
        pageURL:"",
        tags:"",
        goShopTwitterUsername:"goshopTwitter",
        get hrefURL(){
            return `https://twitter.com/intent/tweet?url=${this.pageURL}&hashtags=${encodeURI(this.tags)}&via=${encodeURI(this.goShopTwitterUsername)}&text=${encodeURI(this.text)}`
        }
    },
    {
        icon:icons.linkedInIcon,
        text:"",
        pageURL:"",
        tags:"",
        imageUrl:"",
        postTitle:"",
        get hrefURL(){
            return `https://www.linkedin.com/shareArticle?url=${this.pageURL}&title=${this.postTitle}`
        }
    },
    {
        icon:icons.pinterestIcon,
        text:"",
        pageURL:"",
        tags:"",
        imageUrl:"",
        get hrefURL(){
            return `https://pinterest.com/pin/create/bookmarklet/?media=${encodeURI(this.imageUrl)}&url=${encodeURI(this.pageURL)}&is_video=${false}&description=${encodeURI(this.text)}`
        }
    },
    
    // icons.twitterIcon,icons.pinterestIcon,icons.instagramIcon
];

const ProductInfoAndCardOption = ({product,shopInfo}) => {
    const [filteredProductVarity,setfilteredProductVarity] = useState(product.varity);
    const [activeImage,setActiveImage] = useState(product.img?.length ? product.img[0]:"");
    const [choosenProduct,setChoosenProduct] = useState({});
    const [cartProduct,setCartProduct] = useState({});
    const [socialMediaSharesBtn,setSocialMediaSharesBtn] = useState(socialShares);

  

    const handleProductChoose = (name,value) =>{
        switch (name) {
            case 'color':
            case 'size':
                // check if color is the same color, then remove, else add
                if (value === choosenProduct[name]) {
                    const temp = {...choosenProduct}
                    delete temp[name];
                    setChoosenProduct(temp);
                }else{
                    setChoosenProduct(pre=>{
                        const temp = {...pre}
                        temp[name] = value;
                        return temp;
                    })
                }
                
                break;
        
            default:
                break;
        }
    }

    const handleQuantity = (type,value) =>{
        const tempCard = {...cartProduct};
        
        if (type === "increase") {
            tempCard.order_quantity += 1; 
        }else if (type === "decrease") {
            
            tempCard.order_quantity -= 1; 
        }else{
            tempCard.order_quantity = parseInt(value); 
        }
        setCartProduct(tempCard);
    }

    useEffect(()=>{
        // filter the products and set new varity
        if(choosenProduct.color && !choosenProduct.size){
            setfilteredProductVarity(product.varity.filter(varity =>varity.color === choosenProduct.color));
        }
        else if(!choosenProduct.color && choosenProduct.size){
            setfilteredProductVarity(product.varity.filter(varity =>varity.size === choosenProduct.size));
        }else if(!choosenProduct.color && !choosenProduct.size){
            setfilteredProductVarity(product.varity);
        }
        // select card product and show price
        const productCart = product.varity.find(singleVarity => ((singleVarity.color === choosenProduct.color) && (singleVarity.size === choosenProduct.size)));
        if(productCart) productCart.order_quantity = 1;
        setCartProduct(productCart?productCart:{});
    },[choosenProduct.color,choosenProduct.size])
    
    const handleAddTOCart = () =>{
        if (cartProduct._id) {
            // get existing cart
            const existingCarts = localStorage.getItem("goShop")?JSON.parse(localStorage.getItem("goShop")):[];
            // check if product id and varity id are same, then replace the new one
            const indexOfExist = existingCarts.findIndex((cart)=>((cart.productID === product._id)&&(cart.varityID === cartProduct._id)));
            
            if (indexOfExist > -1) {
                // console.log(indexOfExist,"indexOfExist insetting ",{productID:product._id,varityID:cartProduct._id,order_quantity:cartProduct.order_quantity});
                existingCarts.splice(indexOfExist,1,{productID:product._id,varityID:cartProduct._id,order_quantity:cartProduct.order_quantity})
                localStorage.setItem("goShop",JSON.stringify(existingCarts));
            }else{
                localStorage.setItem("goShop",JSON.stringify([...existingCarts,{productID:product._id,varityID:cartProduct._id,order_quantity:cartProduct.order_quantity}]))
            }
            setCartProduct({});
            setfilteredProductVarity(product.varity);
            setChoosenProduct({});
            alert("product added to cart")
        }else{
            alert("Select a cart first!")
        }
        
        // console.log(localStorage.getItem("goShop")?JSON.parse(localStorage.getItem("goShop")):[]);
    }
    
    

    // add the dynamic property to the socialShare object
    useEffect(()=>{
        socialShares.map(share=>{
            share.tags =`${product.model},${product.title.replace(" ","_")}`;
            share.text = product.details.description.join(". ");
            share.pageURL = window.location?.href;
            share.imageUrl = product.img?.length? product.img[0]:"";
            share.postTitle = product.title;
            return share;
        })
    },[])

    return (
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)"}}>
            <div>
                <div>
                    {/* if uninstall InnerImageZoom, delete the custom CSS from global.css file also */}
                    <InnerImageZoom
                        src={activeImage}
                        width={400}
                        height={400}
                        zoomType="hover"
                        zoomPreload={true}
                    />
                </div>
                <div style={{display:"flex",}}>
                    {
                        product.img?.map(image =><div onClick={()=>setActiveImage(image)} style={{border:`${activeImage === image ? "1px solid grey":""}`}} key={image}><Image src={image} width={100} height={100} alt={product.title}></Image></div>)
                    }
                </div>
            </div>
            <div>
                <h3>{product.title}</h3>
                <div style={{borderBottom:"1px solid lightGrey"}}>
                    <div><Image src={shopInfo.brand} width={100} height={100} alt={product.title}></Image></div>
                    <div>
                        <p>category:{product.category?.main}</p>
                        <p>{product.model}</p>
                    </div>
                </div>
                <div>
                    <h1 className='m-0'>${product.active_price}</h1>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <Rating  ratingValue={20 * product.review_avg}  readonly = {true} size={25}/>
                        <p>({product.reviews?.length} reviews)</p>
                    </div>
                    <div>
                        <ul>
                            {
                                product.details?.highlights?.map((highlight,idx)=><li key={`highlight-${idx}`}>{highlight}</li>)
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <div style={{display:"flex"}}>
                        {
                            [...new Set(filteredProductVarity?.map(varityObj=>varityObj.color))].map(color=> <div style={{width:"40px",height:"40px", backgroundColor:`${color}`, boxShadow:"0 0 10px 1px lightGrey",margin:"4px",position:"relative", borderRadius:"50%", cursor:"pointer"}} onClick={()=>handleProductChoose("color",color)} key={color}>
                                <div style={{position:"absolute",top:"20%",left:"40%",width:"10px",height:"20px",borderBottom:"4px solid yellowGreen",borderRight:"4px solid yellowGreen", transform:"rotate(40deg)", display:`${choosenProduct.color === color ? "block":"none"}`}}></div>
                            </div>)
                        }
                    </div>
                    <div style={{display:"flex"}}>
                        {
                            [...new Set(filteredProductVarity?.map(varityObj=>varityObj.size))].map(size=> <div key={size}>
                                <button onClick={()=>handleProductChoose("size",size)} >{size}</button>
                            </div>)
                        }
                    </div>
                    <div>
                        {
                            cartProduct.price && <div>
                                {cartProduct.quantity <= 0 && <h3>Out of Stock</h3>}
                                <h1>${cartProduct.price}</h1>
                                <button onClick={()=>{setfilteredProductVarity(product.varity);setChoosenProduct({})}}>Clean All</button>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            cartProduct.quantity &&  <div>
                                <div>
                                    <input onChange={(e)=>handleQuantity(null,e.target.value)} style={{width:"100px"}} value={cartProduct.order_quantity?cartProduct.order_quantity:1} type="number"/>
                                    {cartProduct.order_quantity < 2 ? <button disabled>-</button>:<button onClick={()=>handleQuantity("decrease")}>-</button>}
                                    {cartProduct.order_quantity < cartProduct.quantity ? <button onClick={()=>handleQuantity("increase")}>+</button>: <button disabled>+</button>}
                                    
                                </div>
                                <div>
                                    {
                                        cartProduct.quantity <= 0 
                                        ? <button disabled>Out of Stock</button>
                                        : <button onClick={handleAddTOCart}>Add To Cart</button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    {
                        socialMediaSharesBtn.map(socialShare => <div key={socialShare.icon}>
                            <a href={socialShare.hrefURL} target={"_blank"}  rel="noreferrer">{getSVGicons(socialShare.icon,30,30)}</a>
                        </div>)
                    }
                </div>
                <a href="https://twitter.com/intent/tweet?url=https://dev.to/dsasse07/beginner-s-guide-to-jest-testing-in-react-1nig&text=Beginner's%20Guide%20to%20Jest%20Testing%20in%20React&via=dannysasse" target="_blank" rel="noreferrer">Share on Twitter</a>
            </div>
        </div>
    );
};

export default ProductInfoAndCardOption;