import { styled } from "styled-components";
import FooterProduct from "./FooterProduct";
import FooterCertification from "./FooterCertification";

const FooterBottomStyled = styled.div`
  background-color: #f8f8f8;
  padding: 2rem 0 2.5rem;
`;
const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default function FooterBottom() {
  return (
    <FooterBottomStyled>
      <Container>
        {/* <FooterProduct /> */}
        <FooterCertification />
      </Container>
    </FooterBottomStyled>
  );
}
