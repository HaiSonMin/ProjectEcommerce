import logoPage from "@/assets/logos/logo_dark.png";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FiPhone } from "react-icons/fi";
import { LuPackageSearch } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import HeaderSearch from "./search-input/HeaderSearch";
import HeaderButtonAuth from "./HeaderButtonAuth";
import { PATH_PUBLIC, PATH_MEMBER } from "@/constant/path-router";

const HeaderMenuTopStyled = styled.div`
  padding: 1rem 0;
  background-color: var(--color-primary);
`;

const Navs = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-styled {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--color-white);
    font-size: 1.2rem;
    padding: 5px 1rem;
    border-radius: 1rem;
    transition: all 0.3s;
    cursor: pointer;

    & svg {
      width: 2.8rem;
      height: 2.8rem;
    }

    &:hover {
      background-color: var(--color-primary-light);
    }
  }
`;

const LogoPage = styled(Link)`
  width: 18rem;
  & img {
    width: 100%;
  }
`;

const NavTelItem = styled.a``;
const NavLinkItem = styled(Link)`
  & p {
    font-size: 1.4rem;
  }
  cursor: pointer;
`;

const CartBlock = styled.div`
  position: relative;
`;
const CountBuy = styled.div`
  position: absolute;
  top: -3px;
  left: -6px;
  width: 1.6rem;
  height: 2rem;
  background-color: var(--color-white);
  border-radius: 50%;
  text-align: center;
  color: var(--color-grey-800);
  font-weight: 600;
`;
export default function HeaderMenu() {
  return (
    <HeaderMenuTopStyled>
      <Navs>
        <LogoPage to={"/"}>
          <img src={logoPage} alt="Logo Page" />
        </LogoPage>
        <HeaderSearch />
        <NavTelItem className="nav-styled" href={"tel: 0345299087"}>
          <FiPhone />
          <p>
            Gọi mua hàng
            <br />
            0345.299.087
          </p>
        </NavTelItem>
        <NavLinkItem className="nav-styled" to={`/${PATH_MEMBER.member}`}>
          <MdOutlineDiscount />
          <p>
            Xem mã
            <br />
            giảm giá
          </p>
        </NavLinkItem>
        <NavLinkItem className="nav-styled" to={"/#"}>
          <LuPackageSearch />
          <p>
            Tra cứu
            <br />
            Đơn hàng
          </p>
        </NavLinkItem>
        <NavLinkItem className="nav-styled" to={`/${PATH_PUBLIC.cart.root}`}>
          <CartBlock>
            <TbShoppingBag />
            <CountBuy>2</CountBuy>
          </CartBlock>
          <p>
            Giỏ
            <br />
            hàng
          </p>
        </NavLinkItem>
        <HeaderButtonAuth />
      </Navs>
    </HeaderMenuTopStyled>
  );
}
