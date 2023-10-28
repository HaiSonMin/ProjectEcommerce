import {
  Button,
  Heading,
  InputAuth,
  LoginRegisterLabel,
  LogoAuth,
  SpinnerLogo,
} from "@/components/shared";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CONSTANT from "@/constant/value-constant";
import { UseAuthApi } from "@/apis-use";
import { useRef } from "react";
import { IAuthRegister } from "@/interfaces/models/auth.interface";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { EnumOptionConfirmOTP } from "@/enum";
import {
  setOptionConfirmOTP,
  setUserEmailOTP,
} from "@/storeReducer/public/otpSlice";
import { PATH_AUTH } from "@/constant/path-router";

const RegisterLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 6rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const ImgLogo = styled.img`
  width: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70rem;
`;

const LoginNow = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  font-size: 1.4rem;

  & p {
    color: var(--color-grey-500);
  }

  & a {
    color: var(--color-primary);
    font-weight: 600;
  }
`;

const Note = styled.p`
  margin-top: 5px;
  font-size: 1.2rem;
  color: var(--color-grey-300);
  font-style: italic;
  text-align: left;
`;

const MIN_LENGTH_PASSWORD = 6;

export default function RegisterLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register, formState, watch, getValues, reset } =
    useForm<IAuthRegister>();
  const { errors: errorsForm } = formState;
  const { isCreatingSessionRegister, createSessionRegister } =
    UseAuthApi.createSessionRegister();
  const refCaptcha = useRef<ReCAPTCHA>(null);

  const onSubmit = (dataForm: IAuthRegister) => {
    const tokenReCaptcha = refCaptcha.current?.getValue();
    if (!tokenReCaptcha) return toast.error("Hãy vui lòng xác thực ReCaptcha");

    const dataRegister: IAuthRegister = {
      user_fullName: dataForm["user_fullName"],
      user_email: dataForm["user_email"],
      user_phoneNumber: dataForm["user_phoneNumber"],
      user_password: dataForm["user_password"],
      user_confirmPassword: dataForm["user_confirmPassword"],
      tokenCaptcha: tokenReCaptcha,
    };

    createSessionRegister(dataRegister, {
      onSuccess: () => {
        refCaptcha.current?.reset();
        reset();
        dispatch(setUserEmailOTP(dataForm["user_email"]));
        dispatch(setOptionConfirmOTP(EnumOptionConfirmOTP.REGISTER));
        navigate(`/${PATH_AUTH.generateOTP}`);
      },
      onError: () => refCaptcha.current?.reset(),
    });
  };

  return (
    <>
      {isCreatingSessionRegister && <SpinnerLogo />}
      <RegisterLayoutStyled>
        <Header>
          <Heading $as="h3">Đăng ký Smember</Heading>
        </Header>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logoLogin"
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputAuth
            id="userFullName"
            type="text"
            register={register("user_fullName", {
              required: {
                value: true,
                message: "Vui lòng cung cấp tên người dùng",
              },
            })}
            label="Tên người dùng"
            hasValue={!!watch("user_fullName")}
            error={errorsForm["user_fullName"]?.message}
          />
          <InputAuth
            id="phoneNumber"
            type="text"
            register={register("user_phoneNumber", {
              required: { value: true, message: "Vui lòng nhập số điện thoại" },
              validate: (phoneNumberInput) => {
                if (!phoneNumberInput.match(CONSTANT.REGEX_PHONE))
                  return "Số điện thoại không hợp lệ, vui lòng kiểm tra lại";
              },
            })}
            label="Nhập số điện thoại"
            hasValue={!!watch("user_phoneNumber")}
            error={errorsForm["user_phoneNumber"]?.message}
          />

          <InputAuth
            id="userEmail"
            type="text"
            register={register("user_email", {
              required: { value: true, message: "Vui lòng bổ sung email" },
              validate: (emailInput) => {
                if (!emailInput.match(CONSTANT.REGEX_EMAIL))
                  return "Email không hợp lệ";
              },
            })}
            label="Nhập email"
            hasValue={!!watch("user_email")}
            error={errorsForm["user_email"]?.message}
          >
            <Note>(*)Hóa đơn VAT khi mua hàng sẽ được gửi về email này </Note>
          </InputAuth>
          <InputAuth
            id="password"
            type="password"
            register={register("user_password", {
              required: { value: true, message: "Vui lòng bổ sung mật khẩu" },
              minLength: {
                value: MIN_LENGTH_PASSWORD,
                message: "Mật khẩu phải nhiều hơn 6 ký tự",
              },
            })}
            label="Nhập mật khẩu"
            hasValue={!!watch("user_password")}
            error={errorsForm["user_password"]?.message}
          >
            <Note>(*)Mật khẩu phải nhiều hơn 6 ký tự</Note>
          </InputAuth>
          <InputAuth
            id="comfirmPassword"
            type="password"
            register={register("user_confirmPassword", {
              required: {
                value: true,
                message: "Vui lòng xác nhận lại mật khẩu",
              },
              validate: (passwordInput) => {
                if (passwordInput.trim() !== getValues("user_password"))
                  return "xác nhận mật khẩu không khớp";
              },
            })}
            label="Xác nhận lại mật khẩu"
            hasValue={!!watch("user_confirmPassword")}
            error={errorsForm["user_confirmPassword"]?.message}
          />
          <InputAuth
            id="promoCode"
            type="promoCode"
            register={register("user_referralCode")}
            label="Nhập mã giới thiệu (nếu có)"
            hasValue={!!watch("user_referralCode")}
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
            size="normal"
            ref={refCaptcha}
          />
          <Button $width="100%" className="mt-[1.5rem]">
            Đăng Ký
          </Button>
          <LoginRegisterLabel>
            <p>Hoặc đăng nhập bằng</p>
          </LoginRegisterLabel>
        </Form>
        <LogoAuth />
        <LoginNow>
          <p>Bạn đã có tài khoảng?</p>
          <Link to={`/${PATH_AUTH.auth}/${PATH_AUTH.login}`}>Đăng nhập ngay</Link>
        </LoginNow>
      </RegisterLayoutStyled>
    </>
  );
}
