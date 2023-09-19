import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import PopupLogin from "./PopupLogin";

const LogoAuthStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1.4rem 0 2.4rem;
`;

const LogoLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 1rem;
  cursor: pointer;

  font-size: 1.4rem;
`;

const ImgLogo = styled.img`
  width: 3rem;
  margin-right: 1rem;
`;

const redirectLoginGooglePopup = () => {
  const googleLinkURL = `${import.meta.env.VITE_API_URL}/v1/auth/login/google`;
  const newWindowGoogleLogin = PopupLogin({ googleLinkURL });
};

export default function LogoAuth() {
  const dispatch = useDispatch();

  return (
    <LogoAuthStyled>
      <LogoLogin onClick={redirectLoginGooglePopup}>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/image45.93ceca6.png"
          alt="google-logo"
        />
        <span>Đăng nhập bằng google</span>
      </LogoLogin>
      <LogoLogin>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Logo-Zalo-Arc.a36365b.png"
          alt="zalo-logo"
        />
        <span>Đăng nhập bằng zalo</span>
      </LogoLogin>
    </LogoAuthStyled>
  );
}
