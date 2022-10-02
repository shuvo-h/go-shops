import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import ReviewSingleCard from './ReviewSingleCard';

const reviewPercentData = [
    {min:4,max:5,ratingValue:5},
    {min:3,max:3.99,ratingValue:4},
    {min:2,max:2.99,ratingValue:3},
    {min:1,max:1.99,ratingValue:2},
    {min:0,max:0.99,ratingValue:1},
]


const ProductReview = ({product}) => {
    const {login_status,user} = useSelector(state=>state.User);
    const [newRating,setNewRating] = useState({});
    const [isReviewAddLoading,setIsReviewAddLoading] = useState(false);
console.log(newRating);
    
    const getReviewPercentage = (min,high) =>{
        const reviewPercent = (product.reviews?.map(review=>{
            if (min <= review?.product_review && review?.product_review <= high) {
                return review.product_review;
            }
        })?.filter(review=>review === Number(review))?.length*100)/product.reviews?.length;
       
        return reviewPercent ? reviewPercent : 0;
    }

    const handleReviewSubmit = (e) =>{
        e.preventDefault();
        if (user._id && product._id) {
            setIsReviewAddLoading(true);
            newRating.user_id = user._id;
            newRating.product_id = product._id;
            newRating.review_date = new Date();
            newRating.product_review = newRating.product_review/20;
            fetch("/api/reviews?type=product",{
                method:"POST",
                headers:{"content-type":"application/json","Authorization":`Bearer ${user.token}`},
                body: JSON.stringify(newRating)
            })
            .then(res=>res.json())
            .then(data=>{
                setIsReviewAddLoading(false);
                if (!data.error.status) {
                    alert("Review Saved Successfully!");
                    // router.push("/login");
                }else{
                    alert(JSON.stringify(data.error.message))
                }
            })
            .catch(err=>{
                // console.log(err);
                alert(err.message);
                setIsReviewAddLoading(false);
            })

        }else{
            alert("Something went wrong!")
        }

    }
    const onChangeReviewhandler = (value,name) =>{
        setNewRating(pre=>{
            const temp = {...pre}
            pre[name] = value;
            return pre;
        })
    }

    const reviewNavs = [
        {name:"Show All", path:"show_all"},
        {name:"Most Helpful Positive", path:"Most_Helpful_Positive"},
        {name:"Most Helpful Negative", path:"Most_Helpful_Negative"},
        {name:"Highest Rating", path:"Highest_Rating"},
        {name:"Lowest Rating", path:"Lowest_Rating"},
    ]
    // console.log(product.reviews);
    return (
        <div>
            <h1>Write code for Product Review</h1>
            <div  style={{display:"grid",gridTemplateColumns:"1fr 2fr"}}>
                <div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <h1 style={{fontSize:"40px"}}>{product.review_avg?.toFixed(2)}</h1>
                        <div>
                            <p>Average Rating</p>
                            <div>
                                <Rating  ratingValue={20 * product.review_avg}  readonly = {true} size={20}/>
                                ({product.reviews?.length} Reviews)
                            </div>
                        </div>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"100px 1fr"}}>
                        <h1>%%%</h1>
                        <p>Recommended(x of y)</p>
                    </div>
                    <div>
                        {
                            reviewPercentData.map(rating=><div style={{display:"grid",gridTemplateColumns:"110px 1fr", alignItems:"center"}} key={rating.ratingValue}>
                                <div><Rating  ratingValue={20 * rating.ratingValue}  readonly = {true} size={20}/></div>
                                <div style={{display:"flex"}}>
                                    <input onChange={()=>{}} type="range" value={getReviewPercentage(rating.min,rating.max)} />
                                    <p>{getReviewPercentage(rating.min,rating.max).toFixed(0)}%</p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
                <div>
                    <h4>Submit Your Review</h4>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <p>
                        Your Rating Of This Product : 
                        <Rating 
                            onClick={(val)=>onChangeReviewhandler(val,"product_review")}
                            ratingValue={20 * 4} 
                            readonly = {false}
                            size={20}
                            initialValue={0}
                            allowHalfIcon={true}
                            allowHover={true}
                            transition={true}
                            showTooltip={false}
                        />
                    </p>
                    <form onSubmit={handleReviewSubmit}>
                        <textarea onChange={e=>onChangeReviewhandler(e.target.value,e.target.name)} name="text" placeholder='Write your review here' id="" cols="30" rows="10"></textarea>
                        {isReviewAddLoading ? <button disabled>Loading....</button>: <button type="submit">Submit Review</button>}
                        
                    </form>
                </div>
            </div>
            <div>
                <nav style={{display:"flex",justifyContent:"space-between"}}>
                    {
                        reviewNavs.map(reviewNav=><button key={reviewNav.path}>{reviewNav.name}</button>)
                    }
                </nav>
                <div>
                    {
                        product.reviews?.map(review => <ReviewSingleCard review={review} key={review._id}></ReviewSingleCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductReview;