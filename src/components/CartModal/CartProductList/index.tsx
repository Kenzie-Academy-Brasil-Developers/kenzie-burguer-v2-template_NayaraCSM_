import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { ProductContext } from "../../../providers/CartContext";

const CartProductList = () => {
  const { currentSales, total, removeAll } = useContext(ProductContext);
  return (
    <StyledCartProductList>
      <ul>
        {currentSales.map((productFromCart) => {
          return (
            <CartProductCard
              key={productFromCart.id}
              productFromCart={productFromCart}
            />
          );
        })}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          R$ {total.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => removeAll(0)}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
