import Layout from '../components/Layout'
import ProductItem from '../components/Product'

import db from '../utils/db'
import Product from '../models/product'
import { CartContext } from '../context/Cart'
import { useContext } from 'react'

import { toast } from 'react-toastify'


function Home({products}) {
  const {state, dispatch} = useContext(CartContext)
  
  
  function addToCartHandler(product){
    const existingItem = state.cart.cartItems.find((item)=> item.slug === product.slug)

    const qty = existingItem ? existingItem.qty + 1 : 1



    dispatch({type :'ADD_ITEMS' , payload: {...product , qty}})


    toast.success('Product Added!')

    
}

  return (
    <Layout title='Home Page'>
     <div className="grid grid-cols-1 gap-20 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
     {products.map((pItem)=>(
   <ProductItem 
   addtocart={addToCartHandler}
  item={pItem}
   key={pItem.slug}
   ></ProductItem>
      ))}
     </div>
     
    </Layout>
  )
}

export default Home


export async function getServerSideProps(){

  await db.connect()

  const products = await Product.find().lean()

  return{
    props: {products: products.map(db.convertToObj)},
  }
}
