import React from 'react';
import usePagination from '../../hooks/usePagination/usePagination';
import SellerSingleCard from './SellerSingleCard';

const shop_commonFilter = [
    {sortRule:"Sort by newness: old to new", name:"createdAt",sort:"createdAt"},
    {sortRule:"Sort by newness: new to old", name:"createdAt",sort:"-createdAt"},
    {sortRule:"Sort by rating: low to high", name:"review",sort:"review"},
    {sortRule:"Sort by rating: high to low", name:"review",sort:"-review"},
    {sortRule:"Sort by Alphabetically: A to Z", name:"shop_name",sort:"shop_name"},
    {sortRule:"Sort by Alphabetically: Z to A", name:"shop_name",sort:"-shop_name"},
];


const SellerCards = ({sellers,setSelectOption,displayPageNumbers,totalCount,pageSize,currentPage}) => {
    // console.log(sellers);
    const onChangeSortHandler = (e) =>{
        setSelectOption(pre =>{
            const temp = {...pre};
            temp.sort = e.target.value;
            return temp;
        })
    }
    return (
        <section>
            <div>
                <div>
                    <select onChange={e=>onChangeSortHandler(e)} name="sort" id="">
                        {
                            shop_commonFilter.map((sorting,idx) => <option value={sorting.sort} key={sorting.sortRule}>{sorting.sortRule}</option>)
                        }
                    </select>
                </div>
                <div>
                    <p>Showing {(currentPage-1)*pageSize + 1}-{currentPage*pageSize < totalCount ? currentPage*pageSize : totalCount } of {totalCount}</p>
                </div>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1em"}}>
                {
                    sellers.map(seller => <SellerSingleCard seller={seller} key={seller._id}></SellerSingleCard>)
                }
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