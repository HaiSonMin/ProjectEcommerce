import logoPage from "@/assets/logos/logo_dark.png";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FiPhone } from "react-icons/fi";
import { LuPackageSearch } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { MdNoAccounts, MdOutlineDiscount, MdClose } from "react-icons/md";
import HeaderSearch from "./HeaderSearch";
import { useState} from "react";

const LoginButton = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const toggleLoginForm = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
    console.log(showLoginForm);
  };
  const closeLoginForm = () => {
    setShowLoginForm(false);
  }
  
  return (
    <>
      <NavLinkItem className="nav-styled" onClick={toggleLoginForm} to={"/#"}>
        <MdNoAccounts />
        <p>
          Đăng
          <br />
          nhập
        </p>
        
      </NavLinkItem>
      <LoginModal showLoginForm={showLoginForm}>
        <div style={{ textAlign: 'center', display:'flex' ,justifyContent: 'center', gap:'10px' }}>
          <MdNoAccounts style={{ fontSize: '25px' }} />
          <p>Smember</p>
          <MdClose onClick={closeLoginForm} style={{ fontSize: '25px', position:'absolute', right:'20', borderRadius:'50%', background:'silver', color:'white' }}/>
        </div>
        <h2 style={{ textAlign: 'left', fontSize:'20px' }}>
          Vui lòng đăng nhập tài khoản Smember để <br/> có trải nghiệm mua sắm tốt hơn
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap:'20px' }}>
          <button style={{ width:'180px', background:'red', color:'white', padding:'10px', borderRadius:'10px', marginTop:'10px'}}>Đăng nhập ngay</button>
          <button style={{ width:'180px', background:'white', color:'red',padding:'10px', borderRadius:'10px',marginTop:'10px', border:'1px solid red'}}>Đăng ký</button>
        </div>
      </LoginModal>
    </>
  );
};

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
 
  filter: ${(props) => (props.showLoginForm ? 'blur(5px)' : 'none')}; /* Làm mờ nội dung khi hiển thị LoginButton */
 
  .nav-styled {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    font-size: 1.4rem;
    padding: 5px 1rem;
    border-radius: 1rem;
    transition: all 0.3s;

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
  background-color: #fff;
  border-radius: 50%;
  text-align: center;
  color: #15140c;
  font-weight: 600;
`;

const AppWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const buttonLogin = styled.div`
  display: 'flex';
  justifyContent: 'center';
  gap:'10px';
`;


const LoginModal = styled.div<{ showLoginForm: boolean }>`
  /* CSS cho bảng đăng nhập và đăng ký */
  font-family: 'McLaren', cursive;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 20px;
  transform: translate(-50%, -50%);
  z-index: 999;
  opacity: ${(props) => (props.showLoginForm ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;


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
