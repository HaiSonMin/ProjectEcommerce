import { CONSTANT } from "../../utils";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { MdPayment } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TbBrandApple } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { RiCoupon2Line } from "react-icons/ri";
import { FiShoppingCart, FiSettings } from "react-icons/fi";
import { FaRegGrinStars } from "react-icons/fa";
import { BsPatchQuestion,BsFillPostcardHeartFill } from "react-icons/bs";
import { PiUsersFourDuotone } from "react-icons/pi";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { BiCategory, BiSolidDiscount } from "react-icons/bi";


const MainNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NavLinkStyled = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg,
  &:hover span,
  &:active span,
  &.active:link span,
  &.active:visited span {
    color: var(--color-indigo-700);
    font-weight: 600;
  }
`;

const MainNavAdmin = () => {
  return (
    <MainNavList>
      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.dashboard}>
          <AiOutlineHome /> <span>Home</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.brand}>
          <TbBrandApple />
          <span>Brand</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.productCategory}>
          <BiCategory />
          <span>Category</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.demand}>
          <BsFillPostcardHeartFill />
          <span>Demand</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.product}>
          <HiMiniDevicePhoneMobile />
          <span>Product</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.discount}>
          <BiSolidDiscount />
          <span>Discount</span>
        </NavLinkStyled>
      </li>
      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.coupon}>
          <RiCoupon2Line />
          <span>Coupon</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.user}>
          <FaRegUser />
          <span>User</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.customer}>
          <PiUsersFourDuotone />
          <span>Customer</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.order}>
          <FiShoppingCart />
          <span>Order</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.payment}>
          <MdPayment />
          <span>Payment</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.rating}>
          <FaRegGrinStars />
          <span>Rating</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.question}>
          <BsPatchQuestion />
          <span>Question</span>
        </NavLinkStyled>
      </li>

      <li>
        <NavLinkStyled to={CONSTANT.PATH_ADMIN.setting}>
          <FiSettings />
          <span>Setting</span>
        </NavLinkStyled>
      </li>
    </MainNavList>
  );
};

export default MainNavAdmin;
