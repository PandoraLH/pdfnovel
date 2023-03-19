import '../styles/globals.css'
import Header from '@/Layout/Header'
import Head from 'next/head'

function MyApp({Component, pageProps}){
    if(Component.getLayout){
        return Component.getLayout(<Component {...pageProps}/>)
    }

    return (    
    <>
        <Head>
            <title>PDF Novel</title>
        </Head>
        <Header/>
        <Component {...pageProps}/>
    </>
    )
}

export default MyApp