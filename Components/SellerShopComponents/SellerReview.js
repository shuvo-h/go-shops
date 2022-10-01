import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import Expand5Reviews from '../common/Expand5Reviews/Expand5Reviews';
const initialRating = {text:"",ratings:{
    feature: 0,
    varity: 0,
    flexibility: 0,
    delivery: 0,
    support: 0,
}}

const reviews = [
    {
        user_id:"",  // ref
        shop_id:"",  // ref
        product_id:"",  // ref
        review_date:"",
        text:"",
        ratings:{
            feature: 3.8,
            varity: 3.8,
            flexibility: 3.8,
            delivery: 3.8,
            support: 3.8,
        }
    },
]
const ratings = ['feature','varity','flexibility','delivery','support']
const SellerReview = ({shop}) => {
    const user = useSelector(state=>state.User.user);
    const [newReview,setNewReview] = useState(initialRating);
    const [averageTypeReview,setAverageTypeReview] = useState({});

    
    const onChangeRatingChange = (e,nestedType,ratingName,value) =>{
        switch (nestedType) {
            case 'ratings':
                setNewReview(pre=>{
                    const tempNest = {...pre};
                    tempNest['ratings'] = tempNest['ratings'] ? {...tempNest['ratings']} : {}
                    tempNest['ratings'][ratingName] = parseFloat((value/20).toFixed(3));
                    return tempNest;
                })
                break;
        
            default:
                setNewReview(pre=>{
                    const tempDef = {...pre};
                    tempDef[e.target.name] = e.target.value;
                    return tempDef;
                })
                break;
        }
    }

    const reviewPostHandler = () =>{
        const reviewDoc = {
            user_id: user._id,  // ref
            shop_id: shop._id,  // ref, in product review, sent product_id here
            review_date: "", // add it from mongoose.pre("save",()=>{})
            ...newReview
        }
        fetch(`/api/reviews?type=shop`,{
            method:"POST",
            headers:{"content-type":"application/json","Authorization":`Bearer ${user.token}`},
            body:JSON.stringify(reviewDoc)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (!data.error.status) {
                alert("Review Saved Successfully!");
                // setNewReview(initialRating);
            }else{
                alert(`${data.error.message}:Failed to save review!`)
            }
        })
    }
    

    useEffect(()=>{
        if (!shop.reviews?.length) {
            return
        }
        // calculate sum
        const sumTypeReview = shop.reviews?.reduce(({delivery,feature,flexibility,support,varity,countIdx},{ratings})=>{
            return {delivery:delivery+ratings?.delivery, feature:feature+ratings?.feature, flexibility:flexibility+ratings?.flexibility, support:support+ratings?.support, varity:varity+ratings?.varity}
        },{delivery:0,feature:0,flexibility:0,support:0,varity:0});
        // calculate average
        const averageTypeRatingArr = Object.entries(sumTypeReview).map(sumReview=>({[sumReview[0]]:(sumReview[1]/shop.reviews.length).toFixed(1)}));
        const averageTypeRating = Object.assign({},...averageTypeRatingArr);
        setAverageTypeReview(averageTypeRating);
    },[shop.reviews])

    const calcAverageRating =(ratingObj)=>{
        if(!ratingObj) return 0;
        delete ratingObj?._id;
        return  Object.entries(ratingObj).reduce((preVal,currObj)=>preVal+parseFloat(currObj[1]),0) / 5;
    }
    return (
        <div>
            <div>
                <h4>Write a review</h4>
                <textarea onChange={e=>onChangeRatingChange(e)} name="text" value={newReview.text} id="" cols="30" rows="10" placeholder='Write a review'></textarea>
                <div>
                    {
                        ratings.map(ratingName=><div key={ratingName}>
                            <p style={{display:"inline-block",textTransform:"capitalize",width:"70px",margin:"0"}}>{ratingName}</p>
                            <Rating 
                                onClick={(val)=>onChangeRatingChange(null,"ratings",ratingName,val)}
                                ratingValue={20 * newReview.ratings[ratingName]} 
                                readonly = {false}
                                size={20}
                                initialValue={0}
                                allowHalfIcon={true}
                                allowHover={true}
                                transition={true}
                                showTooltip={false}
                            />
                        </div>)
                    }
                </div>
                <button onClick={reviewPostHandler}>Add Your Review</button>
            </div>
            <div>
                <h4>Reviews</h4>
                <div>John Doehas reviewed this store</div>
                <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
                    <div>{Expand5Reviews(averageTypeReview,{size:20,allowHalfIcon:true,readonly:true})}</div>
                    <div>
                        <button>{(shop.review_avg)?.toFixed(1)}/5 </button>
                        <div>
                        <Rating 
                                ratingValue={20 * shop.review_avg} 
                                readonly = {true}
                                size={20}
                                allowHalfIcon={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    shop.reviews?.map(singleRating => <div style={{display:"flex",gap:"2rem",margin:"10px auto", boxShadow:"0 0 10px 1px lightgrey",padding:"8px 14px"}} key={singleRating._id}>
                        <div>
                            <img src={singleRating.user_id?.img} alt="sample static" />
                            <p>rated</p>
                            <button>{calcAverageRating(singleRating.ratings)}</button>
                        </div>
                        <div style={{flexGrow:1}}>
                            <h4>{singleRating.user_id?.first_name} {singleRating.user_id?.last_name}</h4>
                            <p>1 Reviews {`${new Date(singleRating.review_date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",year:"numeric",month:"long",day:"numeric"}).replace(/\b(at)\b/g,(matchStr)=>``)}`}</p>
                            <p>{singleRating.text}</p>
                        </div>
                        <div>
                            <div>{Expand5Reviews(singleRating.ratings,{size:20,allowHalfIcon:true,readonly:true})}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SellerReview;