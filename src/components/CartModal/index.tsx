import { MdClose } from "react-icons/md";
import CartProductList from "./CartProductList";

import { StyledCartModalBox } from "./style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { useContext } from "react";
import { ProductContext } from "../../providers/CartContext";

export interface IModalCartProps {
  setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartModal = ({ setOpenModalCart }: IModalCartProps) => {
  const { currentSales } = useContext(ProductContext);

  return (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag="h2" $fontSize="three">
            Carrinho de compras
          </StyledTitle>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => {
              setOpenModalCart(false);
            }}
          >
            <MdClose size={21} />
          </button>
        </header>
        {currentSales.length > 0 ? (
          <div className="cartBox">
            <CartProductList />
          </div>
        ) : (
          <div className="emptyBox">
            <StyledTitle tag="h3" $fontSize="three" textAlign="center">
              Sua sacola está vazia
            </StyledTitle>
            <StyledParagraph textAlign="center">Adicione itens</StyledParagraph>
          </div>
        )}
      </dialog>
    </StyledCartModalBox>
  );
};

export default CartModal;
