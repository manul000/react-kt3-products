import { useEffect, useState } from 'react';

const API_URL = 'https://fakestoreapi.com/products';

function isProduct(product) {
    return (
        product &&
        Number.isInteger(product.id) &&
        typeof product.title === 'string' &&
        typeof product.description === 'string' &&
        typeof product.price === 'number' &&
        typeof product.category === 'string' &&
        typeof product.image === 'string' &&
        product.rating &&
        typeof product.rating.rate === 'number'
    );
}

export default function useProductsApi(id) {
    const [attempt, setAttempt] = useState(0);
    const [state, setState] = useState({ key: null, loading: true });
    const key = id === undefined ? 'all' : id;

    useEffect(() => {
        if (id !== undefined && !/^[1-9]\d*$/.test(id)) {
            setState({ key, loading: false, notFound: true });
            return;
        }
        const controller = new AbortController();
        let active = true;
        const timeout = setTimeout(() => controller.abort(), 15000);
        setState({ key, loading: true });

        async function load() {
            try {
                const response = await fetch(id === undefined ? API_URL : `${API_URL}/${id}`, {
                    signal: controller.signal
                });
                if (!active) {
                    return;
                }
                if (response.status === 404 && id !== undefined) {
                    setState({ key, loading: false, notFound: true });
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Сервер вернул ошибку ${response.status}.`);
                }
                const text = await response.text();
                const data = text.trim() ? JSON.parse(text) : null;
                if (!active) {
                    return;
                }
                if (id !== undefined && data === null) {
                    setState({ key, loading: false, notFound: true });
                } else if (
                    id === undefined
                        ? Array.isArray(data) && data.every(isProduct)
                        : isProduct(data) && data.id === Number(id)
                ) {
                    setState({ key, loading: false, data });
                } else {
                    throw new Error('Сервер вернул некорректные данные.');
                }
            } catch (error) {
                if (active) {
                    setState({
                        key,
                        loading: false,
                        error:
                            error.name === 'AbortError'
                                ? 'Сервер не ответил за 15 секунд.'
                                : 'Не удалось загрузить товары. Проверьте подключение к интернету и доступность API.'
                    });
                }
            } finally {
                clearTimeout(timeout);
            }
        }
        load();
        return () => {
            active = false;
            clearTimeout(timeout);
            controller.abort();
        };
    }, [id, key, attempt]);

    return {
        ...(state.key === key ? state : { loading: true }),
        retry: () => setAttempt((current) => current + 1)
    };
}
