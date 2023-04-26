import { useContext } from "react"
import Layout from "../components/Layout"
import { CartContext } from "../context/Cart"
import Image from "next/image"
import { useReducer } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"





function CartPage (){

const router = useRouter()

const { state , dispatch} = useContext(CartContext)
const {cart:{cartItems}, } = state


function removeItemHandler (item){
    dispatch({type: 'REMOVE_ITEMS', payload : item})
}

 return(
    <Layout title={'Shopping'}>
        <h2 className="flex items-center justify-center text-2xl">Shopping Cart</h2>
        {cartItems.length === 0 ?(
            <div className="flex items-center justify-center text-lg  mt-10 ">Cart Is Empty</div>
        ) : (
            <div className="grid md:grid-cols-4 md:gap-5 mt-16">
            <div className="overflow-x-auto md:col-span-3">
                <table className="min-w-full">
                    <thead className="border-b">
                        <tr>
                            <th className="px-5 text-left">Item</th>
                            <th className="p-5 text-right">Quantity</th>
                            <th className="px-5 text-right">Price</th>
                            <th className="p-5">Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {cartItems.map((item)=>(
                            <tr key={item.slug} className="border-b">
                            <td>
                                <span className="flex item-center">
                                   <Image src={item.image} width={50} height={50}/>
                                  <div className=" mx-5 mt-3">{item.title}</div> 
                                </span>
                            </td>
                            <td className="px-10 text-right">{item.qty}</td>
                                <td className="p-5 text-right">{item.price}</td>
                                <td className="p-5 text-center text-gray-800 hover:text-red-600 ">
                                    <button className="bg-gray-200 p-2 rounded-lg font-serif  " onClick={()=>{removeItemHandler(item)}}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                
               
            </div>
            <div>
                    <div className="bg-gray-200 flex items-center justify-center rounded-full">
                        Total Price : {''}
                        {cartItems.reduce((acc , cur )=> acc + cur.qty * cur.price , 0)}
                    </div>
                 
                    
                </div>
           
                <div>
                    <button  className="rounded-xl bg-gray-700 text-white 
                    px-4 py-2 hover:-translate-y-0.5 duration-200 hover:shadow-lg mt-96"
                    onClick={()=> router.push('login?redirect=/shipping')}
                    >Checkout</button>
                  </div>
        </div> 
        )}
       

    </Layout>
 )
}


export default dynamic(()=>Promise.resolve(CartPage) , {ssr: false})