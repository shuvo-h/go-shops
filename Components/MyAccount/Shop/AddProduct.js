import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AddProduct = () => {
    const [ existingTitles,setExistingTitles] = useState([]);
    const [ existingShops,setExistingShops] = useState([]);
    const [ filteredExTitles,setFilteredExTitles] = useState([]);
    const [ newProductInfo,setNewProductInfo] = useState({category:{}});
    const [ subCategoryOptions,setSubCategoryOptions] = useState([]);
    const [ separators,setSeparators] = useState([]);
    const [ addProductLoading,setAddProductLoading] = useState(false);

    const user = useSelector(({User})=>User.user);
    const categories = useSelector(state=>state.Home.categories);
    console.log(newProductInfo);
    // console.log(existingShops);

    useEffect(()=>{
        // get list of existing titles
        fetch("/api/products/titles")
        .then(res=>res.json())
        .then(docs=>{
            if (!docs.error) {
                setExistingTitles(docs.data)
                setFilteredExTitles(docs.data.slice(0,3))
            }
        })
        // get list of all shops of this user
        fetch("/api/shops/user",{
            method:"GET",
            headers:{"content-type":"application/json","Authorization":`Bearer ${user.token}`},
        })
        .then(res=>res.json())
        .then(docs=>{
            console.log(docs);
            if (!docs.error) {
                setExistingShops(docs)
            }
        })
    },[])

    const onChangeProductInfo = (e,actionType) =>{
        switch (e.target.name) {
            case "title":
                const typedFilterTitles = existingTitles.filter(titleEl => titleEl.title.indexOf(e.target.value)>-1);
                setFilteredExTitles(typedFilterTitles.slice(0,3))
                console.log(typedFilterTitles);
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    // tempInfo['address'][e.target.name] = e.target.value;
                    tempInfo[e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
            case "category":
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    // tempInfo['address'][e.target.name] = e.target.value;
                    tempInfo['category'][actionType] = e.target.value;
                    return tempInfo;
                })
                break;
            case "sub_category_separator":
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    if (tempInfo['category'][actionType]) {
                        tempInfo['category'][actionType] = [...tempInfo['category'][actionType],e.target.value];
                    }else{
                        tempInfo['category'][actionType] = [e.target.value];
                    }
                    // remove duplicate
                    tempInfo['category'][actionType] = [...new Set(tempInfo['category'][actionType])]
                    return tempInfo;
                })
                break;
            case "img":
                if (e.key === 13 || e.key === "Enter") {
                    // console.log(e.target.value,e.target.name);
                    const newImg = e.target.value;
                    setNewProductInfo(pre=>{
                        const tempInfo = {...pre};
                        if (tempInfo.hasOwnProperty(e.target.name)) {
                            // console.log("own pro",[...tempInfo[e.target.name],e.target.value]);
                            tempInfo[e.target.name] = [...tempInfo[e.target.name],newImg];
                        }else{
                            console.log("own nnoot pro");
                            tempInfo[e.target.name] = [newImg];
                        }
                        // remove duplicate
                        tempInfo[e.target.name] = [...new Set(tempInfo[e.target.name])];
                        return tempInfo;
                    })
                    e.target.value = "";
                }
                break;
            case "price":
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    const isExistPrice = tempInfo[e.target?.name]?.length ? true: false;
                    if (isExistPrice) {
                        tempInfo[e.target?.name][0].price = parseFloat(e.target?.value);
                    }else{
                        tempInfo[e.target?.name] = [{price: parseFloat(e.target?.value), date:""}]
                    }
                    return tempInfo;
                })
                break;
            case "date":
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    const isExistDate = tempInfo['price']?.length ? true: false;
                    if (isExistDate) {
                        tempInfo['price'][0].date =e.target?.value;
                    }else{
                        tempInfo['price'] = [{date: e.target?.value, price:0}]
                    }
                    return tempInfo;
                })
                break;
        
            default:
                setNewProductInfo(pre=>{
                    const tempInfo = {...pre};
                    tempInfo[e.target.name] = e.target.value;
                    return tempInfo;
                })
                break;
        }
    }
    
    
    const onBlurHandler =()=>{
        // make empty the existing titles array on blur
        setFilteredExTitles([]);
    }
    
    useEffect(()=>{
        // update the subcategory part on changin the main category
        const subcategories = categories.find(categoryEl => newProductInfo.category?.main === categoryEl.category);
        setSubCategoryOptions(subcategories?.sub_category ? subcategories?.sub_category : [])
        setSeparators(subcategories?.separator ? subcategories?.separator : [])

    },[newProductInfo.category.main])

    const productAddHandler = async() =>{
        setAddProductLoading(true);
        fetch("/api/products",{
            method:"POST",
            headers:{"content-type":"application/json","Authorization":`Bearer ${user.token}`},
            body: JSON.stringify(newProductInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setAddProductLoading(false);
            if (!data.error.status) {
                alert("Product added successfull!");
                // router.push("/login");
            }else{
                console.log(data.error.message);
                alert(JSON.stringify(data.error.message))
            }
        })
        .catch(err=>{
            // console.log(err);
            alert(err.message);
            setAddProductLoading(false);
        })
    }


    return (
        <div>
            <h2>AddProduct</h2>
            <div>
                <div>
                    <div>
                        <p>Shop Name</p>
                        <div>
                            <select onChange={e=>onChangeProductInfo(e)}  name="shop" id="">
                                {
                                    existingShops?.map(shop => <option value={shop._id} key={shop._id}>{shop.shop_name}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Title:</p>
                        <input onChange={e=>onChangeProductInfo(e,"title")} onBlur={onBlurHandler} name="title" type="text" placeholder='Write title' />
                        <div  style={{position:"relative"}} >
                            <div style={{color:"red", position:"absolute",backgroundColor:"white",boxShadow:" 0 5px 20px 1px goldenrod"}} >
                                {
                                    newProductInfo.title && filteredExTitles.map(titleEl => <p key={titleEl.title}>{titleEl.title}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <p>Main Category</p>
                                <div>
                                    <select onChange={e=>onChangeProductInfo(e,"main")} name="category" id="">
                                        {categories.map(ctg=><option value={ctg.category} key={ctg._id}>{ctg.category}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p>Sub Category</p>
                                <div>
                                    {/* <select onChange={e=>onChangeProductInfo(e,"sub_category")} name="category" id=""> */}
                                        {subCategoryOptions?.map(ctg=><button onClick={e=>onChangeProductInfo(e,"sub_category")} name='sub_category_separator' value={ctg} key={ctg}>{ctg}</button>)}
                                </div>
                            </div>
                            <div>
                                <p>Special Separator</p>
                                <div>
                                    {separators?.map(ctg=><button onClick={e=>onChangeProductInfo(e,"separator")} name='sub_category_separator' value={ctg} key={ctg}>{ctg}</button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>Image preview</p>
                        {
                            newProductInfo.img?.map(image => <img src={image} key={image} width={150} height={150} alt="product image"></img>)
                        }
                    </div>
                    <div>
                        <p>Images Urls:</p>
                        <input onKeyDown={e=>onChangeProductInfo(e)} name='img' type="text" placeholder='Write title' />
                    </div>
                    <div>
                        <p>Price:</p>
                        <input onChange={e=>onChangeProductInfo(e)} name="price" type="number" placeholder='Write title' />
                    </div>
                    <div>
                        <p>Active from:</p>
                        <input onChange={e=>onChangeProductInfo(e)} name="date" type="date"  placeholder='Write title' />
                    </div>
                    <div>
                        <p>Brand:</p>
                        <input onChange={e=>onChangeProductInfo(e)} name="brand" type="text" placeholder='Write title' />
                    </div>
                    <div>
                        <p>Stock:</p>
                        <input onChange={e=>onChangeProductInfo(e)} name="quantity" type="number" placeholder='Write title' />
                    </div>
                    <div>
                        <p>Description:</p>
                        <input onChange={e=>onChangeProductInfo(e)} name="description" type="text" placeholder='Write title' />
                    </div>
                    <div>
                        <button onClick={productAddHandler}>Add Product</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;