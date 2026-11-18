import ProductCard from '../../components/ProductCard/ProductCard';
import useProductsApi from '../../hooks/useProductsApi';
import styles from './ProductsPage.module.css';

function ProductsPage() {
    const { data, loading, error, retry } = useProductsApi();

    return (
        <main className="page">
            <h1 className="visually-hidden">Каталог товаров</h1>
            {loading && <p role="status">Загрузка товаров…</p>}
            {error && (
                <div role="alert">
                    <p>{error}</p>
                    <button onClick={retry}>Повторить</button>
                </div>
            )}
            {data && (
                <div className={styles.grid}>
                    {data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
            {data?.length === 0 && <p>Товаров пока нет.</p>}
        </main>
    );
}

export default ProductsPage;
