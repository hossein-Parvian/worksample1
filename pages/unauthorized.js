import Layout from "../components/Layout"


function Unauthorized (){
    return(
        <Layout title={'Access Denied'}>
    <h2 className="flex mx-auto text-3xl justify-center font-bold">Access Denied!!!</h2>
</Layout>
    )

}

export default Unauthorized