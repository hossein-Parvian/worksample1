import '../styles/globals.css'

import {SessionProvider} from 'next-auth/react'

import { CartContextProvider } from '../context/Cart'

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <div className='bg-gray-100'>
      <SessionProvider session={session}>
      <CartContextProvider>
      <Component {...pageProps} />
      </CartContextProvider>
      </SessionProvider>
     
      
    </div>
  )
}

export default MyApp
