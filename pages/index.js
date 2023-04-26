import Layout from '../components/Layout'
import Product from '../components/Product'

import productItems from '../data/products.json'

function Home() {
  return (
    <Layout title='Home Page'>
     <div className="grid grid-cols-1 gap-20 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2">
     {productItems.map((pItem)=>(
   <Product item={pItem} key={pItem.slug}></Product>
      ))}
     </div>
     
    </Layout>
  )
}

export default Home
