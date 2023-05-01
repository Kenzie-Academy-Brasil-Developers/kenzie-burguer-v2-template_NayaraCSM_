import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { ProductProvider } from "../../providers/CartContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoutes = () => {
  const { user } = useContext(UserContext);
  return user ? (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  ) : (
    <Navigate to="/" />
  );
};
