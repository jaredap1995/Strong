import '../app/globals.css';
import Layout from '../Components/layout'
import Script from 'next/script';
import { UserProvider } from "../contexts/userContexts";

function MyApp({ Component, pageProps }) {

    return (
        <UserProvider>
        <Layout>
            <Script
                src="https://kit.fontawesome.com/1a2ad00ec6.js"
                crossOrigin="anonymous"
            />
            <   Component {...pageProps} />
            </Layout>
        </UserProvider>
        );
    }

export default MyApp;