import { useGlobalContext } from '../../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import FormatPrice from "../../helpers/FormatPrice";
import styles from './SingleProduct.module.scss';
import { useRouter } from 'next/router';
import Star from "../../helpers/Star";
import ColorThief from 'colorthief';
import Image from 'next/image';

const SingleProduct = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { dispatch } = useGlobalContext();
    const router = useRouter();

    // Image bg Changing Dynamically//
    const imageRef = useRef(null);
    const getContrastTextColor = (rgbColor) => {
        const [r, g, b] = rgbColor.map((c) => c / 255);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    };
    useEffect(() => {
        if (imageRef.current) {
            const colorThief = new ColorThief();
            imageRef.current.onload = () => {
                const dominantColor = colorThief.getColor(imageRef.current);
                const rgbColor = `rgba(${dominantColor.join(",")}, 0.8)`;
                const textContrastColor = getContrastTextColor(dominantColor);
                document.documentElement.style.setProperty("--bg-color", rgbColor);
                document.documentElement.style.setProperty("--text-color", textContrastColor);
            };
        }
    }, [imageRef]);

    // Qyantity Inc / Dec //
    const incrementQuantity = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        const { id, title, price, thumbnail } = product;
        dispatch({
            type: "ADD_TO_CART",
            payload: { id, title, price, quantity, thumbnail, stock },
        });
        router.push('/Cart');
    };

    const { thumbnail, category, price, title, description, rating, stock } = product;

    return (
        <div className={styles.cart_Wrapper}>
            <img
                src={thumbnail}
                alt={category}
                ref={imageRef}
                crossOrigin="anonymous"
                style={{ display: 'none' }}
            />
            <Image
                src={thumbnail}
                alt={category}
                width={300}
                height={300}
            />
            <div className={styles.detail}>
                <p className={styles.cartTitle}>{title}</p>
                <p className={styles.cartPrice}>
                    <span><FormatPrice price={price} /></span>
                </p>
                <p className={styles.description}>{description}</p>
                <Star rate={rating} />
                {stock > 0 ? (
                    <p className={styles.inStock}>✔ In stock: {stock} items</p>
                ) : (
                    <p className={styles.outOfStock}>✖ Out of stock</p>
                )}
                <div className={styles.cartdetails}>
                    <button onClick={handleAddToCart} className={styles.cart_btn}>
                        ADD TO CART
                    </button>
                    <div className={styles.cartQuantity}>
                        <button onClick={incrementQuantity}>
                            <i className="fa-solid fa-plus" />
                        </button>
                        <span className={styles.qty}>{quantity}</span>
                        <button onClick={decrementQuantity}>
                            <i className="fa-solid fa-minus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
