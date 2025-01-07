import SingleProduct from '../../component/SingleProduct/SingleProduct'
import Head from 'next/head';
const Product = (props) => {
    return (
        <>
            <SingleProduct product={props.product} />
            <Head>
                <title>{props.product.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </Head>
        </>
    )
}
export const getServerSideProps = async (context) => {
    const { id } = context.params;
    const RES = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await RES.json();

    return {
        props: {
            product,
        },
    };
};

export default Product;