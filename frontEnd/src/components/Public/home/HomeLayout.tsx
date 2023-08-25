import { styled } from "styled-components";
import PhoneLayout from "./product/phone";
import Banner from "./banner/Banner";
import TopHomeLayout from "./top-home";
import LaptopLayout from "./product/laptop";
import CategoryLayout from "./categories-hot";
import OutstandingLayoutOfferLayout from "./outstanding-offer";
import ProductDealHotLayout from "../product/product-deal-hot/ProductDealHotLayout";
import { ProductHotSaleLayout } from "../product";

const HomeLayoutStyled = styled.div``;

export default function HomeLayout() {
  return (
    <HomeLayoutStyled>
      {/* Top */}
      <TopHomeLayout />
      {/* Banner */}
      <Banner />
      <ProductDealHotLayout />
      {/* product */}
      <PhoneLayout />
      <LaptopLayout />
      <ProductHotSaleLayout />
      <OutstandingLayoutOfferLayout />
      <CategoryLayout />
    </HomeLayoutStyled>
  );
}
