import React from 'react';
import usePagination from '../../hooks/usePagination/usePagination';

const shop_commonFilter = [
    {sortRule:"Sort by newness: old to new"},
    {sortRule:"Sort by newness: new to old"},
    {sortRule:"Sort by rating: low to high"},
    {sortRule:"Sort by rating: high to low"},
    {sortRule:"Sort by Alphabetically: A to Z"},
    {sortRule:"Sort by Alphabetically: Z to A"},
];

const SellerCards = ({sellers,displayPageNumbers}) => {
    
  
    
    return (
        <section>
            <div>
                <div>
                    <select name="" id="">
                        {
                            shop_commonFilter.map((sorting,idx) => <option value={sorting.sortRule} key={sorting.sortRule}>{sorting.sortRule}</option>)
                        }
                        
                    </select>
                </div>
                <div>
                    {
                        sellers.map(seller => <p key={seller._id}>{seller.email}</p>)
                    }
                </div>
                <div>
                    <p>Showing 1-8 of 60</p>
                </div>
            </div>
            <div>
                {
                    displayPageNumbers()
                }
            </div>
        </section>
    );
};

export default SellerCards;