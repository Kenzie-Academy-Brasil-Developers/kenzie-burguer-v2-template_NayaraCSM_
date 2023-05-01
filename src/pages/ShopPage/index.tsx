import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

import { StyledContainer } from "../../styles/grid";
import { useState } from "react";

const ShopPage = () => {
  const [openModalCart, setOpenModalCart] = useState(false);

  return (
    <StyledShopPage>
      {openModalCart ? <CartModal setOpenModalCart={setOpenModalCart} /> : null}
      <Header setOpenModalCart={setOpenModalCart} />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
