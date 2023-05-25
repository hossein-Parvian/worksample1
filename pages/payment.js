import Layout from "../components/Layout";
import CheckoutWizard from "../components/Checkoutwizard";
import { useRouter } from "next/router";

function PaymentPage (){

    const router = useRouter()

    const methods =['Gataway',' Offline Payment']

    return(
        <Layout>
            <CheckoutWizard activeStep={2}/>
            <form action="" className="mx-auto max-w-screen-md">
                <h2 className="mb-4 text-xl"></h2>
                {methods.map((item)=>(
                   <div className="mb-4">
                   <input 
                   name="PaymentMethod"
                   className="p-2 outline-none focus:ring-0"
                   id={item}
                   type="radio"/>
                   <label className="p-2" htmlFor={item}>{item}</label>
               </div>
                ))}

                <div className="mb-4 flex justify-between">
                    <button onClick={()=> router.push('/shipping')}
                     className="rounded-xl bg-gray-300 text-gray-700 
                    px-4 py-2 w-28">Back</button>
                    <button className="rounded-xl bg-gray-300 text-gray-700 
                    px-4 py-2 w-28">Next</button>
                </div>
               
            </form>

        </Layout>
    )
}

export default PaymentPage