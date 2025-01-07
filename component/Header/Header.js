import { useGlobalContext } from '../../context/CartContext';
import { FaCartShopping } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Header() {
    const { cart } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => {
            setLoading(true);
            setProgress(10);
        };

        const handleComplete = () => {
            setProgress(100);
            setTimeout(() => {
                setLoading(false);
            }, 300);
        };

        const handleRouteChange = () => {
            let progressInterval;
            if (loading) {
                progressInterval = setInterval(() => {
                    setProgress(prev => {
                        if (prev < 100) {
                            return prev + 2;
                        }
                        return prev;
                    });
                }, 100);
            }

            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router, loading, progress]);

    return (
        <header>
            <div className={styles.navbar}>
                <Link href="/" className={styles.link}>
                    <h1>One<i className="fa-brands fa-opencart"></i>Mart</h1>
                </Link>

                {loading && (
                    <div className={styles.progressBarContainer}>
                        <div
                            className={styles.progressBar}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                <Link href="/Cart" style={{ textDecoration: "none", color: "#fff", fontWeight: "bold" }}>
                    <span className={styles.cart_icon}>
                        <FaCartShopping />
                        <p className={styles.qty}>{cart.length}</p>
                    </span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
