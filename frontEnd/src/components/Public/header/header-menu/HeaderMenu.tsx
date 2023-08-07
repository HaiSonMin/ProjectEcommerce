import { styled } from "styled-components";
import HeaderMenuTop from "./HeaderMenuTop";
import HeaderMenuBottom from "./HeadMenuBottom";

const HeaderMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
`;

export default function HeaderMenu() {
  return (
    <HeaderMenuStyled>
      <HeaderMenuTop />
      <HeaderMenuBottom />
    </HeaderMenuStyled>
  );
}
