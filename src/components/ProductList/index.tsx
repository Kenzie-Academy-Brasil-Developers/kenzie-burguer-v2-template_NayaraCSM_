import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { ProductContext } from "../../providers/CartContext";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <StyledProductList>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </StyledProductList>
  );
};

export default ProductList;
