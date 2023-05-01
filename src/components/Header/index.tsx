import { MdShoppingCart, MdLogout } from "react-icons/md";

import SearchForm from "./SearchForm";
import { StyledHeader } from "./style";
import LogoKenzieBurguer from "../../assets/LogoKenzieBurguer.svg";

import { StyledContainer } from "../../styles/grid";
import { UserContext } from "../../providers/UserContext";
import { useContext } from "react";
import { IModalCartProps } from "../CartModal";

const Header = ({ setOpenModalCart }: IModalCartProps) => {
  const { logout } = useContext(UserContext);
  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className="flexGrid">
          <img
            src={LogoKenzieBurguer}
            alt="Kenzie Burguer Logo"
            className="logo"
          />
          <nav className="nav" role="navigation">
            <SearchForm />
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setOpenModalCart(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                }}
              >
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
