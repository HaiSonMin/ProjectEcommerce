import logoPage from "@/assets/logos/logo_dark.png";
import { Link } from "react-router-dom";
import { css, keyframes, styled } from "styled-components";
import { FiPhone } from "react-icons/fi";
import { LuPackageSearch } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { MdNoAccounts, MdOutlineDiscount, MdClose } from "react-icons/md";
import HeaderSearch from "./HeaderSearch";
import { useEffect, useRef, useState } from "react";
import { PATH_USER } from "@/constant";

const HeaderMenuTopStyled = styled.div`
  padding: 1rem 0;
  background-color: var(--color-primary);
`;

const Navs = styled.div<{ showLoginForm: boolean }>`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  filter: ${(props) =>
    props.showLoginForm
      ? "blur(5px)"
      : "none"}; /* Làm mờ nội dung khi hiển thị LoginButton */

  .nav-styled {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    font-size: 1.4rem;
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

const Overlay = styled.div<{ $showLoginForm: boolean }>`
  display: ${(props) => (props.$showLoginForm ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.3s;
  z-index: 100;
`;

const CountBuy = styled.div`
  position: absolute;
  top: -3px;
  left: -6px;
  width: 1.6rem;
  height: 2rem;
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  color: #15140c;
  font-weight: 600;
`;
const animationModal = keyframes`
  0%   {top:110%; }
  100% {top:50%;}
`

const LoginModal = styled.div<{ $showLoginForm: boolean }>`
  font-family: "McLaren", cursive;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  position: fixed;
  ${props => props.$showLoginForm && 
  css`
  transition: all 0.3s ease-in-out;
  animation: ${animationModal} 0.5s cubic-bezier(0.66, 0, 0, 1) forwards;
  `
  }
  left:50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const LoginButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  return (
    <>
      <div className="nav-styled" onClick={toggleLoginForm}>
        <MdNoAccounts />
        <p>
          Đăng
          <br />
          nhập
        </p>
      </div>
      <Overlay $showLoginForm={showLoginForm} onClick={closeLoginForm}>
        <LoginModal $showLoginForm={showLoginForm}>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <MdNoAccounts style={{ fontSize: "25px" }} />
            <p>Smember</p>
            <MdClose
              onClick={closeLoginForm}
              style={{
                fontSize: "25px",
                position: "absolute",
                cursor:'pointer',
                right: "20",
                borderRadius: "50%",
                background: "silver",
                color: "white",
              }}
            />
          </div>
          <h2 style={{ textAlign: "left", fontSize: "20px" }}>
            Vui lòng đăng nhập tài khoản Smember để <br /> có trải nghiệm mua
            sắm tốt hơn
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Link
              onClick={closeLoginForm}
              to={PATH_USER.login}
              style={{
                textAlign: "center",
                width: "180px",
                background: "red",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              Đăng nhập ngay
            </Link>
            <Link
              onClick={closeLoginForm}
              to={PATH_USER.register}
              style={{
                textAlign: "center",
                width: "180px",
                background: "white",
                color: "red",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "10px",
                border: "1px solid red",
              }}
            >
              Đăng ký
            </Link>
          </div>
        </LoginModal>
      </Overlay>
    </>
  );
};

export default function HeaderMenuTop() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <HeaderMenuTopStyled>
      <Navs showLoginForm={showLoginForm}>
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
        <NavLinkItem className="nav-styled" to={"/#"}>
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
        <NavLinkItem className="nav-styled" to={"/#"}>
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
        <LoginButton />
      </Navs>
    </HeaderMenuTopStyled>
  );
}
