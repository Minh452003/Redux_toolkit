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

export const router = createBrowserRouter([
    {
        path: '/',
        element: < RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'products', element: '' },
            { path: 'products/:id', element: <ProductDetail /> },
            { path: 'signin', element: <SignIn /> },
            { path: 'signup', element: <SignUp /> }
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
                    { index: true, element: <ProductManagerPage /> }, // Redirect to add page by default
                    { path: 'add', element: <AddProductPage /> },
                    { path: ':id/update', element: <UpdateProductPage /> },
                ],
            },
            {
                path: 'categories', children: [
                    { index: true, element: <CategoryManagerPage /> }, // Redirect to add page by default
                    { path: 'add', element: <AddCategory /> },
                    { path: ':id/update', element: <UpdateCategoryPage /> },
                ]
            }
        ]
    }
])