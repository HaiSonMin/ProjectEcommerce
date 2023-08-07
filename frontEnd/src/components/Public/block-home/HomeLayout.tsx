import { styled } from "styled-components";
import PhoneLayout from "./product/phone";
import Banner from "./banner/Banner";
import TopHomeLayout from "./top-home";
import LaptopLayout from "./product/laptop";
import CategoryLayout from "./categories-hot";
import OutstandingLayoutOfferLayout from "./outstanding-offer";
import DealHot from "./deal-hot";

const HomeLayoutStyled = styled.div``;

export default function HomeLayout() {
  return (
    <HomeLayoutStyled>
      {/* Top */}
      <TopHomeLayout />
      {/* Banner */}
      <Banner />
      {/* product */}
      <PhoneLayout />
      <LaptopLayout />
      <DealHot />
      <OutstandingLayoutOfferLayout />
      <CategoryLayout />
    </HomeLayoutStyled>
  );
}
