import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import Register from "../pages/Register";
import ProductDetail from "../pages/ProductDetail";
function RouterConfig() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product-detail/:productId" element={<ProductDetail />} />
    </Routes>
  );
}

export default RouterConfig;
