import Image from 'next/image';
import React from 'react';

const SimilarCategory = ({similarProducts}) => {
    
    return (
        <div>
            <h2 style={{textAlign:"center"}}>Similar Category</h2>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"15px"}} >
                {
                    similarProducts?.map(similarProduct => <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", boxShadow:"0 0 10px 1px lightgrey",padding:"10px"}} key={similarProduct._id}>
                        <div>
                            <h4>{similarProduct.title}</h4>
                            <div>
                                {
                                    similarProduct.category?.sub_category?.map(ctg => <p key={ctg}> &gt; {ctg}</p>)
                                }
                            </div>
                        </div>
                        <div>
                            <Image src={similarProduct.img[0]} width={200} height={200} alt="Not Found"></Image>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SimilarCategory;