import { styled } from "styled-components";
import { PATH_USER } from "@/constant";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 20px;
  align-items: center;
`;

const HrText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom:20px;
  & hr {
    flex-grow: 1;
    background-color: #ccc;
    margin: 2rem 0;
  }
`;
const BottomText = styled.h3`
  text-decoration: underline;
  color: red;
`;

const DoYouKwonAccout = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  gap: 10px;
`;
const ImgLogo = styled.img`
  width: 3rem;
  float: left;
  margin-right: 1rem;
`;
const ContainerLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export default function InputButtonAuth() {
  return (
    <>
      <Container>
        <HrText>
          <hr />
          hoặc đăng nhập bằng
          <hr />
        </HrText>
        <ContainerLink>
          <Link to="/">
            <ImgLogo
              src="https://account.cellphones.com.vn/_nuxt/img/image45.93ceca6.png"
              alt="google-logo"
            />
            Google
          </Link>
          <Link to="">
            <ImgLogo
              src="https://account.cellphones.com.vn/_nuxt/img/Logo-Zalo-Arc.a36365b.png"
              alt="zalo-logo"
            />
            Zalo
          </Link>
        </ContainerLink>
      </Container>
      <DoYouKwonAccout>
        <p style={{ color: "silver" }}>Bạn chưa có tài khoản?</p>
        <Link to={`/${PATH_USER.register}`} style={{ color: "red" }}>
          Đăng ký ngay
        </Link>
      </DoYouKwonAccout>
      <BottomText> Xem chính sách ưu đãi Smember </BottomText>
    </>
  );
}
