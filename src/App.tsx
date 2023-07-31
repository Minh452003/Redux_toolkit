import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./components/layouts/rootLayout";
import './App.css'
import HomePage from "./features/pages/HomePage";
import SignIn from "./features/auth/view/SignIn";
import SignUp from "./features/auth/view/SignUp";
import AdminLayout from "./components/layouts/adminLayout";
import DashBoard from "./features/pages/DashBoard";
import ProductManagerPage from "./features/product/admin/ProductManagerPage";
import AddProductPage from "./features/product/admin/AddProductPage";
import UpdateProductPage from "./features/product/admin/UpdateProductPage";

const App = () => {
  return (
    <div className="App" style={{ width: '100%' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" index element={<HomePage />} />
            <Route path="products" />
            <Route path="products/:id" />
            <Route path="categories/:id" />
            <Route path="contact" element="Contact Page" />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="products">
              <Route index element={<ProductManagerPage />} />
              <Route path='add' element={<AddProductPage />} />
              <Route path=':id/update' element={<UpdateProductPage />} />
            </Route>
            <Route path='categories'>
              <Route index />
              <Route path='add' />
              <Route path=':id/update' />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App