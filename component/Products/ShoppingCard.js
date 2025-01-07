import FormatPrice from "../../helpers/FormatPrice";
import styles from "./ShoppingCard.module.scss";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ShoppingCard({ products }) {
    // FILTER THE CATEGORY //
    const [selectedCategory, setSelectedCategory] = useState("All");
    const categories = ["All", ...new Set(products.map(item => item.category))];
    const filteredItems = selectedCategory === "All"
        ? products
        : products.filter(item => item.category === selectedCategory);

    return (
        <>
            <div className={styles.select}>
                {categories.map((category) => (
                    <button
                        key={category}
                        title={` Lists of ${category}`}
                        className={styles.cateItems}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div >
            <div className={styles.maintitle}>
                <span className={styles.span}>CHECK NOW!</span>
                <h2 className={styles.main}>OUR MOST PRODUCTS</h2>
            </div>
            <div className={styles.products_Wrapper}>
                {filteredItems.map((Item) => {
                    const { price, thumbnail, category, description, id } = Item;
                    return (
                        <Link
                            href={`/product/${id}`}
                            style={{
                                textDecoration: "none",
                                margin: ".8rem .8rem",
                                color: "black",
                            }}
                            key={id}
                        >
                            <div className={styles.product}>
                                <Image
                                    src={thumbnail}
                                    alt={category}
                                    width={20}
                                    height={10}
                                />
                                <div className={styles.Product_detail}>
                                    <p>{category}</p>
                                    <p><FormatPrice price={price} /></p>
                                    <p>{description.length > 30 ? `${description.substring(0, 30)}...` : description}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div >
        </>
    );
}

export default ShoppingCard;
