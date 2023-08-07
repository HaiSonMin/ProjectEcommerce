import { styled } from "styled-components";
import HeaderTopBar from "./header-topbar/HeaderTopBar";
import HeaderBanner from "./header-banner/HeaderBanner";
import HeaderMenu from "./header-menu/HeaderMenu";

const HeaderLayoutStyled = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  z-index: 999;
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
