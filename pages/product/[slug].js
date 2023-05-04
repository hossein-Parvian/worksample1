import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../context/Cart";
import products from "../../data/products";

import db from "../../utils/db";

import Product from "../../models/product";


import { toast } from 'react-toastify'



function ProductPage({product}){
   const {state , dispatch} =useContext(CartContext)
   
   const router = useRouter()

  


   if (!product){
    return <div>Product not found</div>
   }


    function addToCartHandler(){
        const existingItem = state.cart.cartItems.find((item)=> item.slug === product.slug)

        const qty = existingItem ? existingItem.qty + 1 : 1


    


        dispatch({type :'ADD_ITEMS' , payload: {...product , qty}})

      

        toast.success('Product Added!!!')

    }

return(
<Layout title={product.title}>
   <div className="grid md:grid-cols-3 md:gap-4 bg-white rounded-xl p-10 ">
    <div className="md:cols-span-2">
    <Image 
    className="rounded-xl"
    src={product.image}
    height={200}
    width={240}
    layout="responsive"/>
    </div>
    <div className="text-lg mt-10 mx-8 ">
        <h2>title : {product.title}</h2>
        <p>Category : {product.cat}</p>
        <p>description : {product.description}</p>
    </div>
    <div className="p-5 ">
        <div className="mb-2 flex justify-between">
            <div>Price:</div>
            <div>{product.price}</div>
        </div>
        <div className="mb-2 flex justify-between">
            <div>status:</div>
            <div>{product.count > 0 ?'Available':'Unavailable'}</div>
        </div>
        <button onClick={addToCartHandler}
         className="rounded-xl bg-gray-700 text-white  mt-8 px-6 py-2">
            Add to Cart
        </button>
        
    </div>
   </div>
    </Layout>
)
}


export default ProductPage



export async function getServerSideProps (context) {

    const {params} = context
    const {slug} = params

    await db.connect()

     const product = await Product.findOne({slug}).lean()
    return {
        props: {
            product: product ? db.convertToObj(product) : null
        }
    }

}