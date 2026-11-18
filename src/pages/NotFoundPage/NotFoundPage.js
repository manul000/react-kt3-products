import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage({ message = 'Страница не найдена' }) {
    return (
        <main className={`page ${styles.page}`}>
            <p className={styles.code}>404</p>
            <h1>{message}</h1>
            <Link to="/products">Перейти к товарам</Link>
        </main>
    );
}

export default NotFoundPage;
