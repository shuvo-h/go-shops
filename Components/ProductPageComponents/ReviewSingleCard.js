import Image from 'next/image';
import React from 'react';
import { Rating } from 'react-simple-star-rating';

const ReviewSingleCard = ({review}) => {
    // console.log(review);
    
    return (
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr", margin:"20px auto", borderBottom:"1px solid lightgrey"}}>
            <div>
                <Image src={review.user_id?.profile_img ? review.user_id?.profile_img : ""} width={80} height={80} alt={`${review.user_id?.first_name} ${review.user_id?.last_name}`}></Image>
            </div>
            <div>
                <div>
                    <h5 className='m-0'>{review.user_id?.first_name} {review.user_id?.last_name}</h5>
                    <p className='m-0'>{new Date(review.review_date).toLocaleString("en-US",{day:"numeric",month:"long",year:"numeric",hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                </div>
                <div><Rating  ratingValue={20 * review.product_review}  readonly = {true} size={20}/></div>
                <p className='m-0'>{review.text}</p>
                <div>
                    <button>Helpful({review.likes.length})</button>
                    <button>Unhelpful({review.unlikes.length})</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewSingleCard;