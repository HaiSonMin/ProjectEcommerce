import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { LOGO_PAYMENT } from "./Constant";

const FooterPaymentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
//////////////////////////////////////////
const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BlockItem = styled.div`
  padding-left: 1rem;
`;

const ListTel = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.2rem;
`;

const LinkTel = styled.a`
  text-decoration: none;
  font-weight: 600;
  font-size: 1.2rem;
`;

//////////////////////////////////////////
const ListPayments = styled.ul`
  display: flex;
  gap: 1rem;
`;

const LinkImg = styled(Link)`
  display: inline-block;
  width: 5rem;
  height: 3rem;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  & img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

export default function FooterPayment() {
  return (
    <FooterPaymentStyled>
      <FooterBlock>
        <p>Free support hotline</p>
        <BlockItem>
          <ListTel>
            <li>
              Call to buy <LinkTel href="tel: 0345299087">0345.299.087</LinkTel>{" "}
              (7h30 - 22h00)
            </li>
            <li>
              Call to complain{" "}
              <LinkTel href="tel: 0868824241">0868.824.241</LinkTel> (7h30 -
              22h00)
            </li>
            <li>
              Call to warranty{" "}
              <LinkTel href="tel: 0999888888">0999.888.888</LinkTel> (7h30 -
              22h00)
            </li>
          </ListTel>
        </BlockItem>
      </FooterBlock>
      <FooterBlock>
        <p>Free support hotline</p>
        <BlockItem>
          <ListPayments>
            {LOGO_PAYMENT.map((item) => (
              <li key={item.id}>
                <LinkImg to={item.linkTo}>
                  <img src={item.src} alt={item.alt} />
                </LinkImg>
              </li>
            ))}
          </ListPayments>
        </BlockItem>
      </FooterBlock>
    </FooterPaymentStyled>
  );
}
