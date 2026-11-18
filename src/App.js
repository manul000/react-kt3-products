import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductPage from './pages/ProductPage/ProductPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';

const router = createHashRouter([
    { path: '/', element: <Navigate to="/products" replace /> },
    { path: '/products', element: <ProductsPage /> },
    { path: '/product/:id', element: <ProductPage /> },
    { path: '*', element: <NotFoundPage /> }
]);

function App() {
    return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
}

export default App;
