import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from "../context/CartContext";
import Footer from '../component/Footer/Footer';
import Header from '../component/Header/Header';
import '../styles/globalstyle.scss';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <div className="app">
                <CartProvider>
                    <Header />
                    <Component {...pageProps} />
                </CartProvider>
            </div>
            <Footer />
        </>
    );
}

export default MyApp;
