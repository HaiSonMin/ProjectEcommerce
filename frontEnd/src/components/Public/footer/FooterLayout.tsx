import { styled } from "styled-components";
import FooterTop from "./footer-top";
import FooterBottom from "./footer-bottom";

const FooterLayoutStyled = styled.footer`
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  overflow-x: hidden;
  width: 100%;
  margin-top: 2rem;
`;

export default function FooterLayout() {
  return (
    <FooterLayoutStyled>
      <FooterTop />
      <FooterBottom />
    </FooterLayoutStyled>
  );
}
