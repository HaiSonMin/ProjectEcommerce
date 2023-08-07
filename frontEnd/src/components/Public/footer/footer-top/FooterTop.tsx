import { styled } from "styled-components";
import FooterPayment from "./FooterPayment";
import FooterInformation from "./FooterInformation";
import FooterService from "./FooterService";
import FooterConnect from "./FooterConnect";

const FooterTopStyled = styled.div``;
const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  padding: 1.5rem 0 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
`;
export default function FooterTop() {
  return (
    <FooterTopStyled>
      <Container>
        <FooterPayment />
        <FooterInformation />
        <FooterService />
        <FooterConnect />
      </Container>
    </FooterTopStyled>
  );
}
