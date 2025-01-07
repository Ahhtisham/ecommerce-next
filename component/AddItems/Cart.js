import { useGlobalContext } from '../../context/CartContext';
import FormatPrice from "../../helpers/FormatPrice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import styles from './Cart.module.scss';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Cart = () => {
    const { cart, total_price, dispatch, shipping_fee } = useGlobalContext();
    useEffect(() => {
        dispatch({ type: 'CART_TOTLE_PRICE' });
    }, [cart]);

    const handleRemoveFromCart = (id) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
    };

    const handleIncrement = (id) => {
        dispatch({ type: "INCREMENT", payload: id });
    };

    const handleDecrement = (id) => {
        dispatch({ type: "DECREMENT", payload: id });
    };

    return (
        <div className={styles.cart_Item_Container}>
            <div className={styles.cartTitle}>
                <h1>Shopping Cart</h1>
            </div>

            <div className={styles.cartNaming}>
                <p>ITEMS ({cart.length})</p>
                <p>PRICE</p>
                <p>QUANTITY</p>
                <p>TOTAL</p>
                <p>REMOVE</p>
            </div>

            {cart.map((curElem) => {
                const { id, price, quantity, thumbnail } = curElem;

                return (
                    <div className={styles.cartItemslist} key={id}>
                        <Image src={thumbnail} alt="product" height={10} width={10} />
                        <div className={styles.cartDetail}>
                            <p><FormatPrice price={price} /></p>
                            <div className={styles.flex}>
                                <button className={styles.addBtn} onClick={() => handleIncrement(id)}>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                <p className={styles.qty}>{quantity}</p>
                                <button className={styles.addBtn} onClick={() => handleDecrement(id)}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                            </div>

                            <p><FormatPrice price={price * quantity} /></p>
                            <button className={styles.addRemove} onClick={() => handleRemoveFromCart(id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                );
            })}

            <div className={styles.cartFlex} style={{ display: "flex", margin: "1.7rem 0 0 0", justifyContent: "space-between" }}>
                <Link href="/" className={styles.link}>
                    <button className={styles.continueBtn}>Continue Shopping</button>
                </Link>
                {cart.length >= 1 && (
                    <div className={styles.cartTotal}>
                        <span>Subtotal:</span>
                        <p><FormatPrice price={total_price} /></p>
                        <span className={styles.p}>Shipping Fee:</span>
                        <hr />
                        <p><FormatPrice price={shipping_fee} /></p>
                        <span>Total Order:</span>
                        <p><FormatPrice price={total_price + shipping_fee} /></p>

                        <button className={styles.clearBtn} onClick={() => dispatch({ type: "CLEAR_CART" })}>
                            CLEAR CART <RiDeleteBin6Line />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
