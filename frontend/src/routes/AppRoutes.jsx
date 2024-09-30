import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProductsPage from "@/pages/admin/ProductsPage";
import CreateProduct from "@/pages/admin/CreateProduct";
import CreateCategory from "@/pages/admin/CreateCategory";
import ProductDetails from "@/pages/admin/ProductDetails";


const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>


            <Route path="/admin/" element={<AdminLayout />}>
                <Route path="dashboard" element={<ProductsPage />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="create-category" element={<CreateCategory />} />
                <Route path="product/:productId" element={<ProductDetails />} />
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;