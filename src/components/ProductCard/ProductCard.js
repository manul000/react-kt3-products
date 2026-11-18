import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
    return (
        <article className={styles.card}>
            <h2>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
            </h2>
            <Rating rate={product.rating.rate} />
        </article>
    );
}

export default ProductCard;
