import { styled } from "styled-components";
import HeaderTopBar from "./header-topbar/HeaderTopBar";
import HeaderBanner from "./header-banner/HeaderBanner";
import HeaderMenu from "./header-menu/HeaderMenu";

const HeaderLayoutStyled = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 800;
`;

export default function HeaderLayout() {
  return (
    <HeaderLayoutStyled>
      <HeaderTopBar />
      <HeaderBanner />
      <HeaderMenu />
    </HeaderLayoutStyled>
  );
}
