import Layout from "../components/Layout"
import CheckoutWizard from "../components/Checkoutwizard"
import { useContext, useEffect } from "react"
import {CartContext, Store} from '../context/Cart'
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import {useForm} from 'react-hook-form'

function Shipping (){

    const {handleSubmit, setValue, register} = useForm()

    const {state , dispatch} =useContext(CartContext)
    const {cart} = state
    const {shippingData} = cart


    useEffect(()=>{
       setValue('name',shippingData.name)
       setValue('address',shippingData.address)
       setValue('postalCode',shippingData.postalCode)
    }, [
       setValue,
       shippingData.address,
       shippingData.postalCode,
       
    ])


    const router = useRouter()

    function submitHandler({name , address ,postalCode}){
        dispatch({
            type: 'SAVE_SHIPPING_DATA',  
            payload:{name , address ,postalCode},
        })
     
     Cookies.set('cart', JSON.stringify({
        ...cart,
        shippingData:{
            name, 
            address,
            postalCode
        }
     }))
    router.push('/paymant')

    }

    return (
        <Layout title='Shipping'>
       <CheckoutWizard activeStep ={1}/>
       <form  className="mx-auto max-w-screen-md  " onSubmit={handleSubmit(submitHandler)}>
        <h2 className="mb-4 text-xl">Shipping</h2>
        <div className="mb-4">
            <input 
            className="w-full rounded-xl p-2 outline-0"
            id="name"
            placeholder="name"
            autoFocus
            {...register('name')}
            
            />
        </div>
        <div className="mb-4">
            <input 
            className="w-full rounded-xl p-2 outline-0"
            id="address"
            placeholder="address"
            autoFocus 
            {...register('address')}
            />
        </div>
        <div className="mb-4">
            <input 
            className="w-full rounded-xl p-2 outline-0"
            id="postalCode"
            placeholder="postalCode"
            autoFocus 
            {...register('postalCode')}/>
        </div>
        <div className="mb-4">
           <button className="rounded-xl bg-gray-700 text-white
            px-4 py-2 w-28">Next</button>
        </div>
       </form>
        </Layout>
        
    )

}

 Shipping.auth =true

export default Shipping