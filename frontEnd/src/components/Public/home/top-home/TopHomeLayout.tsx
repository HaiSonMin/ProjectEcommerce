import { styled } from "styled-components";
import MenuProduct from "./menu-product";
import Introduce from "./introduce";
import SliderBanner from "./slider-banner";

const TopHomeLayoutStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  min-height: 37rem;
`;

export default function TopHomeLayout() {
  console.log("re-render TopHomeLayout ");
  return (
    <TopHomeLayoutStyled>
      <MenuProduct />
      <SliderBanner />
      <Introduce />
    </TopHomeLayoutStyled>
  );
}
