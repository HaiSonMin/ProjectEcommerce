import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { SERVICE_INFO } from "./Constant";

const FooterServiceStyled = styled.div`
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

export default function FooterService() {
  return (
    <FooterServiceStyled>
      <p>Service and other information</p>
      <BlockItem>
        <List>
          {SERVICE_INFO.map((item) => (
            <li key={item.id}>
              <LinkInfo key={item.id} to={item.linkTo}>
                {item.label}
              </LinkInfo>
            </li>
          ))}
        </List>
      </BlockItem>
    </FooterServiceStyled>
  );
}
