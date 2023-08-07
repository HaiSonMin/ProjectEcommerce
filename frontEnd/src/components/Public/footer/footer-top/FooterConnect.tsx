import { styled } from "styled-components";
import { ICON_SOCIAL, WEBSITE_MEMBER } from "./Constant";
import { Link } from "react-router-dom";

const FooterConnectStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

/////////////////////////////////
const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListLogo = styled.ul`
  display: flex;
  gap: 1rem;
`;

const LinkLogo = styled(Link)`
  display: inline-block;
  width: 4.5rem;
  height: 3rem;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2px;
  & img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

/////////////////////////////////
const BlockMemberWebsite = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const ItemMemberWebsite = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 1.2rem;
  font-weight: 500;
`;

const LinkLogoMemberWebsite = styled(Link)`
  display: inline-block;
  width: 10rem;
  height: 3rem;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2px;
  & img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;

export default function FooterConnect() {
  return (
    <FooterConnectStyled>
      <BlockList>
        <p>Connect with us</p>
        <ListLogo>
          {ICON_SOCIAL.map((item) => (
            <li key={item.id}>
              <LinkLogo to={item.linkTo}>
                <img src={item.src} alt={item.alt} />
              </LinkLogo>
            </li>
          ))}
        </ListLogo>
      </BlockList>
      <BlockList>
        <p>Member web site</p>
        <BlockMemberWebsite>
          {WEBSITE_MEMBER.map((item) => (
            <ItemMemberWebsite key={item.id}>
              <p>{item.label}</p>
              <LinkLogoMemberWebsite to={item.linkTo}>
                <img src={item.src} alt={item.alt} />
              </LinkLogoMemberWebsite>
            </ItemMemberWebsite>
          ))}
        </BlockMemberWebsite>
      </BlockList>
    </FooterConnectStyled>
  );
}
