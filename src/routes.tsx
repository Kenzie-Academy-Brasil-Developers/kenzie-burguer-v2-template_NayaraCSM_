import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import { ProtectRoutes } from "./components/ProtectRoutes";
import { ProductProvider } from "./providers/CartContext";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/shop" element={<ProtectRoutes />}>
        <Route
          path="/shop"
          element={
            <ProductProvider>
              <ShopPage />
            </ProductProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
