import { api } from "../services/api";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProductProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IProductContext {
  products: IProduct[];
  currentSales: IProduct[];
  setCurrentSales: React.Dispatch<React.SetStateAction<IProduct[]>>;
  removeProductFromCartList: (id: number) => void;
  total: number;
  removeAll: (id: number) => void;
}

export const ProductContext = createContext({} as IProductContext);

export const ProductProvider = ({ children }: IProductProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentSales, setCurrentSales] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      const token = localStorage.getItem("@TOKEN");
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log("error");
      }
    };

    loadProduct();
  }, []);

  const removeProductFromCartList = (id: Number) => {
    const newCart = currentSales.filter((product) => product.id != id);
    setCurrentSales(newCart);
    toast.success("Item removido do carrinho com sucesso!", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const total = currentSales
    ? currentSales.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      )
    : 0;

  const removeAll = () => {
    setCurrentSales([]);
    toast.warning("Todos os produtos foram removidos do carrinho.");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        currentSales,
        setCurrentSales,
        total,
        removeProductFromCartList,
        removeAll,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
