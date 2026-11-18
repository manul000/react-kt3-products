import styles from './Rating.module.css';

function Rating({ rate }) {
    const stars = Math.max(0, Math.min(5, Math.round(rate)));

    return (
        <div className={styles.rating} role="img" aria-label={`Рейтинг: ${stars} из 5`}>
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    aria-hidden="true"
                    className={index < stars ? styles.filled : styles.empty}
                >
                    ★
                </span>
            ))}
        </div>
    );
}

export default Rating;
