
export const getProductCategories = async()=>{
    try {
        const categoriesRes = await fetch(`${process.env.PROJECT_BASE_URI}/api/products/categories`)
        const categories = await categoriesRes.json();
        return categories?.data;
    } catch (error) {
        return []
    }
}