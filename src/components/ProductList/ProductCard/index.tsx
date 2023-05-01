import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { IProduct, ProductContext } from "../../../providers/CartContext";
import { useContext } from "react";
import { toast } from "react-toastify";

interface IProductCard {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCard) => {
  const { currentSales, setCurrentSales } = useContext(ProductContext);

  const addProductToCart = (id: number) => {
    if (!currentSales.some((product) => product.id === id)) {
      const newCart = [...currentSales, product];
      setCurrentSales(newCart);
      toast.success("Item adicionado ao carrinho com sucesso!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      toast.error("Item já adicionado ao carrinho.", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          R$ {product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => addProductToCart(product.id)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
