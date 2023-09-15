import { styled } from "styled-components";
import { Link } from "react-router-dom";

const LogoAuthStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.4rem 0 2.4rem;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgLogo = styled.img`
  width: 3rem;
  margin-right: 1rem;
`;

export default function LogoAuth() {
  return (
    <LogoAuthStyled>
      <LogoLink to="/">
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/image45.93ceca6.png"
          alt="google-logo"
        />
        Google
      </LogoLink>
      <LogoLink to="">
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Logo-Zalo-Arc.a36365b.png"
          alt="zalo-logo"
        />
        Zalo
      </LogoLink>
    </LogoAuthStyled>
  );
}
