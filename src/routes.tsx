import { Navigate, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layouts/rootLayout";
import HomePage from "./features/pages/HomePage";
import SignIn from "./features/auth/view/SignIn";
import SignUp from "./features/auth/view/SignUp";
import AdminLayout from "./components/layouts/adminLayout";
import DashBoard from "./features/pages/DashBoard";
import ProductManagerPage from "./features/product/admin/ProductManagerPage";
import AddProductPage from "./features/product/admin/AddProductPage";
import UpdateProductPage from "./features/product/admin/UpdateProductPage";
import CategoryManagerPage from "./features/category/CategoryManagerPage";
import AddCategory from "./features/category/AddCategory";
import UpdateCategoryPage from "./features/category/UpdateCategoryPage";
import ProductDetail from "./features/product/view/ProductDetail";
import CartPage from "./features/cart/CartPage";
import CartDetailPage from "./features/cart/CartDetailPage";
import CategoryDetail from "./features/category/view/CategoryDetail";
import UserProfile from "./features/auth/view/UserProfile";
import OrderPage from "./features/order/OrderPage";
import OrderDetailPage from "./features/order/OrderDetailPage";
import OrderManagerPage from "./features/order/admin/OrderManagerPage";
import OrderDetailManager from "./features/order/admin/OrderDetailManager";
import UserManagerPage from "./features/auth/admin/UserManagerPage";
import CommentManagerPage from "./features/comment/admin/CommentManagerPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: < RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'products', element: '' },
            { path: 'products/:id', element: <ProductDetail /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> },
            { path: 'carts', element: <CartPage /> },
            { path: 'carts/pay', element: <CartDetailPage /> },
            { path: 'category/:id', element: <CategoryDetail /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'order', element: <OrderPage /> },
            { path: 'order/:id', element: <OrderDetailPage /> },

        ]
    },
    {
        path: '/admin',
        element: < AdminLayout />,
        children: [
            { index: true, element: <Navigate to='dashboard' /> },
            { path: 'dashboard', element: <DashBoard /> },
            {
                path: 'products', children: [
                    { index: true, element: <ProductManagerPage /> },
                    { path: 'add', element: <AddProductPage /> },
                    { path: ':id/update', element: <UpdateProductPage /> },
                ],
            },
            {
                path: 'categories', children: [
                    { index: true, element: <CategoryManagerPage /> },
                    { path: 'add', element: <AddCategory /> },
                    { path: ':id/update', element: <UpdateCategoryPage /> },
                ]
            },
            {
                path: 'orders', children: [
                    { index: true, element: <OrderManagerPage /> },
                    { path: ':id/detail', element: <OrderDetailManager /> },
                ]
            },
            {
                path: 'users', children: [
                    { index: true, element: <UserManagerPage /> },
                ]
            },
            {
                path: 'comments', children: [
                    { index: true, element: <CommentManagerPage /> },
                ]
            }
        ]
    }
])