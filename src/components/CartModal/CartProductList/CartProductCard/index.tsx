import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { IProduct, ProductContext } from "../../../../providers/CartContext";
import { useContext } from "react";

interface IProductCartProps {
  productFromCart: IProduct;
}

const CartProductCard = ({ productFromCart }: IProductCartProps) => {
  const { removeProductFromCartList } = useContext(ProductContext);
  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={productFromCart.img} alt={productFromCart.name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {productFromCart.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeProductFromCartList(productFromCart.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
