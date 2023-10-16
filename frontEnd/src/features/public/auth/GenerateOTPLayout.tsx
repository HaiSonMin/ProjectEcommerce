import { Button, Heading, SpinnerLogo } from "@/components/shared";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { VALUE_CONSTANT } from "@/constant";
import { TbMessageCircle2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserEmailOTP,
  getOptionConfirmOTP,
  setTimeExpireOTP,
} from "@/storeReducer/public/otpSlice";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { UseAuthApi } from "@/apis-use";
import { EnumOptionConfirmOTP } from "@/enum";
import toast from "react-hot-toast";
import { PATH_AUTH } from "@/constant/path-router";

const ForgetPasswordContainer = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
`;
const TopContainer = styled.div`
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

const MainContainer = styled.div`
  text-align: left;
  p {
    margin-bottom: 1.5rem;
    color: var(--color-yellow-100);
  }
`;
const ImgLogo = styled.img`
  width: 15rem;
`;
const ConfirmGetPassword = styled.div`
  width: 70rem;
  border: 0.2rem solid red;
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
const PhoneNumber = styled.div`
  p {
    color: var(--color-yellow-100);
  }
  h4 {
    font-weight: 700;
  }
`;

export default function ForgetPasswordLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refCaptcha = useRef<ReCAPTCHA>(null);
  const userEmail = useSelector(getUserEmailOTP);
  const emailDisplay =
    userEmail.slice(0, 2) +
    "********" +
    userEmail.slice(userEmail.indexOf("@") - 1);
  const optionConfirm = useSelector(getOptionConfirmOTP);

  const { generateOTP, isGeneratingOTP } = UseAuthApi.generateOTP();
  const handleGenerateOTP = () => {
    if (!refCaptcha.current.getValue())
      return toast.error("Hãy vui lòng xác thực ReCaptcha");

    generateOTP(
      {
        optionConfirm:
          optionConfirm === EnumOptionConfirmOTP.REGISTER
            ? EnumOptionConfirmOTP.REGISTER
            : EnumOptionConfirmOTP.RESET_PASSWORD,
        timeExpireOTP: VALUE_CONSTANT.TIME_EXPIRE_OTP,
        tokenCaptcha: refCaptcha.current.getValue(),
      },
      {
        onSuccess: () => {
          dispatch(setTimeExpireOTP(VALUE_CONSTANT.TIME_EXPIRE_OTP));
          refCaptcha.current.reset();
          navigate(`/${PATH_AUTH.confirmOTP}`);
        },
      }
    );
  };
  return (
    <ForgetPasswordContainer>
      {isGeneratingOTP && <SpinnerLogo />}
      <IconBack>
        <Link to={`/${PATH_AUTH.login}`}>
          <FaArrowLeft />
        </Link>
        {optionConfirm === EnumOptionConfirmOTP.REGISTER ? (
          <h4>Đăng kí tài khoản mới</h4>
        ) : (
          <h4>Quên mật khẩu</h4>
        )}
        <FaArrowLeft style={{ color: "white" }} />
      </IconBack>
      <TopContainer>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logo"
        ></ImgLogo>
      </TopContainer>
      <MainContainer>
        {optionConfirm === EnumOptionConfirmOTP.REGISTER ? (
          <p>Gửi mã xác nhận đăng hoàn tất đăng kí</p>
        ) : (
          <p>Gửi mã xác nhận để lấy lại mật khẩu</p>
        )}
        <ConfirmGetPassword>
          <TbMessageCircle2Style />
          <PhoneNumber>
            <Heading $as="h6">Qua email</Heading>
            <Heading $as="h5">{emailDisplay}</Heading>
          </PhoneNumber>
        </ConfirmGetPassword>
      </MainContainer>
      <ReCAPTCHA
        sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
        size="normal"
        ref={refCaptcha}
      />
      <Button
        $width="700px"
        className="mt-[1.5rem]"
        onClick={handleGenerateOTP}
      >
        Gửi mã về email
      </Button>
    </ForgetPasswordContainer>
  );
}
