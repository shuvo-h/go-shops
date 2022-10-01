import React from 'react';

const ProductSpecifications = ({model,varity,return_policy}) => {
  
    return (
        <div>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr"}}>
                <div>
                    <p>Model</p>
                </div>
                <div>
                    <p>{model}</p>
                </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr"}}>
                <div>
                    <p>Color</p>
                </div>
                <div>
                    <p>{[...new Set(varity?.map(varityObj=>varityObj.color))]?.join(", ")}</p>
                </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr"}}>
                <div>
                    <p>Size</p>
                </div>
                <div>
                <p>{[...new Set(varity?.map(varityObj=>varityObj.size))]?.join(", ")}</p>
                </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr"}}>
                <div>
                    <p>Guarantee Time</p>
                </div>
                <div>
                    <p>{return_policy?.guarantee?return_policy?.guarantee:"N/A"}</p>
                </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"150px 1fr"}}>
                <div>
                    <p>Warantee Time</p>
                </div>
                <div>
                    <p>{return_policy?.warantee?return_policy?.warantee:"N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;