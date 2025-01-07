import { FaGithub } from 'react-icons/fa';
import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-container']}>
                <div className={styles['footer-left']}>
                    <h3>One<span>Mart</span></h3>
                    <p>Your one-stop shop for all your needs.</p>
                </div>
                <div className={styles['footer-center']}>
                    <h4>Our Category List</h4>
                    <ul>
                        <li>Beauty</li>
                        <li>Fragrances</li>
                        <li>Furniture</li>
                        <li>Groceries</li>
                    </ul>
                </div>
                <div className={styles['footer-right']}>
                    <h4>Contact Us</h4>
                    <a
                        href="https://github.com/Ahhtisham"
                        className={styles['github-link']}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit GitHub Profile"
                    >
                        <FaGithub size={24} /> GitHub
                    </a>
                    <p className={styles.mail}>Email: support@onemart.com</p>
                </div>
            </div>
            <div className={styles['footer-bottom']}>
                <p>Copyright © {new Date().getFullYear()} OneMart. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
