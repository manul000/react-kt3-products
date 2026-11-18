import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../../components/Rating/Rating';
import useProductsApi from '../../hooks/useProductsApi';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import styles from './ProductPage.module.css';

function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, loading, error, notFound, retry } = useProductsApi(id);

    if (notFound) {
        return <NotFoundPage message="Товар не найден" />;
    }

    return (
        <main className={`page ${styles.details}`}>
            {loading && <p role="status">Загрузка товара…</p>}
            {error && (
                <div role="alert">
                    <p>{error}</p>
                    <button onClick={retry}>Повторить</button>
                </div>
            )}
            {product && (
                <>
                    <img className={styles.image} src={product.image} alt={product.title} />
                    <h1>{product.title}</h1>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.price}>Цена: {product.price.toFixed(2)} $</p>
                    <p>Категория: {product.category}</p>
                    <Rating rate={product.rating.rate} />
                </>
            )}
            <button className={styles.back} onClick={() => navigate(-1)}>
                Назад
            </button>
        </main>
    );
}

export default ProductPage;
