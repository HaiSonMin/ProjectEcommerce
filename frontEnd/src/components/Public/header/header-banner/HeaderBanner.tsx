import { styled } from "styled-components";
import { BANNER_LINK } from "./Constant";
import { Link } from "react-router-dom";

const HeaderBannerStyled = styled.div`
  background-color: #e9efff;
  padding: 5px 0;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  max-width: 120rem;
`;

export default function HeaderBanner() {
  return (
    <HeaderBannerStyled>
      <Container>
        {BANNER_LINK.map((item) => (
          <Link key={item.id} to={item.linkTo}>
            <img src={item.src} alt={item.alt} />
          </Link>
        ))}
      </Container>
    </HeaderBannerStyled>
  );
}
