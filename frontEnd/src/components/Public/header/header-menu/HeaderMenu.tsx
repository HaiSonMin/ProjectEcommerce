import { styled } from "styled-components";
import HeaderMenuTop from "./HeaderMenuTop";

const HeaderMenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export default function HeaderMenu() {
  return (
    <HeaderMenuStyled>
      <HeaderMenuTop />
    </HeaderMenuStyled>
  );
}
