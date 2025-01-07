import ShoppingCard from "../component/Products/ShoppingCard";
import Head from "next/head";

const Home = (props) => {
    return (
        <>
            <ShoppingCard products={props.products} />
            <Head>
                <title>Ecommerce</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
        </>
    );
};

export const getStaticProps = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return {
        props: {
            products: data.products,
        },
    };
};

export default Home;
