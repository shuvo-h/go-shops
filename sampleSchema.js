export const productSchema = {
    _id: ObjectId("fdgsdg5vbfd2gv4edf54ved"),
    slug: "wheelbarrow-9092",  // unique
    sku: "9092", // product id or slug id
    name: "Extra Large Wheel",
    description: "details about product",
    details:{
        weight: 47,
        weight_units: "lbs",
        model_num: "TG-4658",
        manufacture: "Acme",
        color: "Green"
    },
    total_reviews: 4,
    average_review: 4.5,
    pricing: {
        retail: 4578,
        sale: 3654
    },
    price_history:[
        {
            retai:4578,
            sale: 3654,
            start: "2021-06-02",
            end: "2021-09-02",
        },
    ],
    primary_category: ObjectId("fgd2369125fdg94123dsf489"),
    sub_categories:[   // a cloth can be in many categories eg. saree: woman ctg, girl product ctg, bride ctg, mother product ctg etc.
        ObjectId("df54sdf2152456dsfd1f2"),  
        ObjectId("df54s24fghr21gg41fgef"),  
    ],
    tags: ["tools","granding","soil"],
    image_urls:["www....jpg"]
}


const categorySchema = {
    _id: ObjectId("dsfs54fd5f2sdf4"),
    slug: "gardening-tools",
    name: "Gardening Tools",
    description: "Gardening gadgets galore!",
    parent_id: ObjectId("55804822812cb336b78728f9"),
    ancestors: [
        {
        name: "Home",
        _id: ObjectId("558048f0812cb336b78728fa"),
        slug: "home"
        },

        {
        name: "Outdoors",
        _id: ObjectId("55804822812cb336b78728f9"),
        slug: "outdoors"
        }
    ]
}

const orderSchema = {
    _id: ObjectId("dfg54df6g5fg4"),
    user_id: ObjectId("DFg4dfg5fd4g5f"),
    state: "CART",
    line_items:[
        {
            _id: ObjectId("dfsg54f5g5fg4"),
            sku: "9092",
            name: "Extra :arge Wheel",
            quantity: 1,
            pricing:{
                retail: 5897, 
                sale: 4897  
            }
        },
    ],
    shipping_address: {
        street : "585 5th Street",
        city: "Brookly",
        state: "NY",
        zip: 112125,
    },
    sub_total: 6196
}


const userSchema = {
    _id: ObjectId("4c4b1476238d3b4dd5000001"),
    username: "kbanker",
    email: "kylebanker@gmail.com",
    first_name: "Kyle",
    last_name: "Banker",
    hashed_password: "bd1cfa194c3a603e7186780824b04419",
    addresses: [
      {
        name: "home",
        street: "588 5th Street",
        city: "Brooklyn",
        state: "NY",
        zip: 11215
      },
      {
        name: "work",
        street: "1 E. 23rd Street",
        city: "New York",
        state: "NY",
        zip: 10010
      }
    ],
    payment_methods: [
      {
        name: "VISA",
        payment_token: "43f6ba1dfda6b8106dc7"
      }
    ]
}


const productReviewSchema = {
    _id: ObjectId("4c4b1476238d3b4dd5000041"),
    product_id: ObjectId("4c4b1476238d3b4dd5003981"),
    date: new Date(2010, 5, 7),
    title: "Amazing",
    text: "Has a squeaky wheel, but still a darn good wheelbarrow.",
    rating: 4,
    user_id: ObjectId("4c4b1476238d3b4dd5000042"),
    username: "dgreenthumb",
    helpful_votes: 3,
    voter_ids: [
      ObjectId("4c4b1476238d3b4dd5000033"),
      ObjectId("7a4f0376238d3b4dd5000003"),
      ObjectId("92c21476238d3b4dd5000032")
    ]
}






// MY SCHEMA FOE EACH COLLECTION/
// details of a product
const productsSchema = {
    title:"",
    slug: "wheelbarrow-9092", 
    category:"ObjectId()",
    sku: "9092", //  unique code of the product
    name: "Extra Large Wheel",
    description: "details about product",
    details:{
        weight: 47,
        weight_units: "lbs",
        model_num: "TG-4658",
        manufacture: "Acme",
        color: "Green"
    },
    total_reviews: 4,
    average_review: 4.5,
    pricing: {
        retail: 4578,
        sale: 3654
    },
    sub_categories:[   // a cloth can be in many categories eg. saree: woman ctg, girl product ctg, bride ctg, mother product ctg etc.
        ObjectId("df54sdf2152456dsfd1f2"),  
        ObjectId("df54s24fghr21gg41fgef"),  
    ],
    tags: ["tools","granding","soil"],
    image_urls:["www....jpg"]
}  

// list of category
const categoriesSchema = {
    category: "Gardening Tools",
    icon:"",
    slug: "gardening-tools",
    description: "Gardening gadgets galore!",
    division:["male","female"],
    sub_category: [ "ObjectId(gf85121654gf412)"]
} 
// list of sub_category
const subCategoriesSchema = {
    sub_category: "Gardening Tools",
    sub_slug: "gardening-tools",
    description: "Gardening gadgets galore!",
} 
// shop owner and/or customer details
const shopOwnerSchema = {
    fName:"",
    lName:"",
    displayName:"",
    email:"",
    password:"",
    mobile:"",
    address:"",
    img:"",
    role: ["user","vendor"]
} 

// vendor details
const vendorSchema = {
    vandor_name: "OAIO STORE",
    slug:"oaito-store",
    address:{
        location:"",
        phone:"",
        contact_email:"",
    },
    banner:"/assest/images/vendor/element/banner/1.jpg",
    brand:"/assest/images/vendor/brand/1.jpg",
    social_profile:{
        facebook:"",
        twitter:"",
        linkedIn:"",
        youtube:"",
        Instagram:"",
    },
    opening_hours:{
        saturday:"", 
        sunday:"", 
    },
    shipping_method: ["Delivery Time: 1-2 business days"],
    store_location:{
        lat: 125,
        lang: 478
    },
} ;
// order  details
const orderInfoSchema = {} 
// shop  details
const paymentSchema = {} 
// product review schema
const productReviewsSchema = {} 

