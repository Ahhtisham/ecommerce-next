import { FaStarHalfStroke, FaStar, FaRegStar } from "react-icons/fa6";
import styles from "./Star.module.scss"

function Star({ rate, count }) {
    const rating = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        return (
            <span key={index}>
                {rate >= index + 1 ? (
                    <FaStar />
                ) : rate >= number ? (
                    <FaStarHalfStroke />
                ) : (
                    <FaRegStar />
                )}
            </span>
        );
    });
    return (
        <div className={styles.starRating}>
            <span className={styles.rate}>{rating}</span>
            <span className={styles.count}>{count} Ratings</span>
        </div>
    )
}

export default Star