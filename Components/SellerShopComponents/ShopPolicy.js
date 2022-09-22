import React from 'react';

const ShopPolicy = ({shop}) => {
    return (
        <div>
           <h4>Shipping Policy</h4>
           <p>{shop.shipping_policy}</p>
           <h4>Refund Policy</h4>
           <p>{shop.refund_policy}</p>
           <h4>Cancellation / Return / Exchange Policy</h4>
           <p>{shop.cancel_policy}</p>
        </div>
    );
};

export default ShopPolicy;