import { Button, Heading } from "@/components";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { PATH_USER } from "@/constant";
import { TbMessageCircle2 } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getUser } from "@/storeReducer/userSlice";

const ForgetPasswordContainer = styled.form`
  font-family: "Times New Roman", Times, serif;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
`;
const Topcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
`;
const IconBack = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  cursor: pointer;
  width: 700px;
  h4 {
    font-weight: 600;
  }
`;

const Maincontainer = styled.div`
  text-align: left;
  p {
    margin-bottom: 1.5rem;
    color:var(--color-yellow-100);
  }
`;
const ImgLogo = styled.img`
  width: 15rem;
`;
const ComfirmGetPassword = styled.div`
  width: 70rem;
  border: .2rem solid red;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
`;
const TbMessageCircle2Style = styled(TbMessageCircle2)`
  font-size: 5rem;
  background-color: #ec98b1;
  color: red;
  padding: 1rem 0.8rem;
  border-radius: 50%;
`;
const Phonenumber = styled.div`
  p {
    color: var(--color-yellow-100);
  }
  h4 {
    font-weight: 700;
  }
`;

export default function ForgetPasswordLayout() {
    const user = useSelector(getUser);
    console.log(user);
    
  return (
    <form>
      <ForgetPasswordContainer>
        <IconBack>
          <Link to={`/${PATH_USER.login}`}>
            <FaArrowLeft />
          </Link>
          <h4>Quên mật khẩu </h4>
          <FaArrowLeft style={{ color: "white" }} />
        </IconBack>
        <Topcontainer>
          <ImgLogo
            src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="logo"
          ></ImgLogo>
        </Topcontainer>
        <Maincontainer>
          <p>Gửi mã xác nhận để lấy lại mật khẩu</p>
          <ComfirmGetPassword>
            <TbMessageCircle2Style />
            <Phonenumber>
              <Heading $as='h6'>Qua email</Heading>
              <Heading $as="h5">
                {user.userEmail}
              </Heading>
            </Phonenumber>
          </ComfirmGetPassword>
        </Maincontainer>
        <Button type="submit" style={{ width: "700px" }}>
          <Link to={`/${PATH_USER.OTP}`}>
            Tiếp Tục
          </Link>
        </Button>
      </ForgetPasswordContainer>
    </form>
  );
}
