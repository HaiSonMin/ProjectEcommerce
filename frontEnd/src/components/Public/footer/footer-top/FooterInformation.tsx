import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { INFO_POLICY } from "./Constant";

const FooterInformationStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BlockItem = styled.div`
  padding-left: 1rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LinkInfo = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
`;

export default function FooterInformation() {
  return (
    <FooterInformationStyled>
      <p>Information and policy</p>
      <BlockItem>
        <List>
          {INFO_POLICY.map((item) => (
            <li key={item.id}>
              <LinkInfo key={item.id} to={item.linkTo}>
                {item.label}
              </LinkInfo>
            </li>
          ))}
        </List>
      </BlockItem>
    </FooterInformationStyled>
  );
}
