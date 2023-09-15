import {
  Button,
  Heading,
  InputAuth,
  LoginRegisterLabel,
  LogoAuth,
} from "@/components";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IUserCreate } from "./../interfaces/user.interface";
import { Link } from "react-router-dom";
import { PATH_USER } from "@/constant";
import CONSTANT from "@/constant/value-constant";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
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

const ErrorInput = styled.p`
  margin-top: 5px;
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: 600;
  text-align: left;
`;

const MIN_LENGTH_PASSWORD = 6;

const RegisterPage: React.FC = () => {
  useEffect(() => {}, []);

  const { handleSubmit, register, formState, watch, getValues } =
    useForm<IUserCreate>();
  const { errors: errorsForm } = formState;
  const onSubmit = (dataForm) => {};
  return (
    <RegisterContainer>
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
            required: { value: true, message: "Vui lòng nhập họ và tên" },
          })}
          label="Nhập họ và tên"
          hasValue={!!watch("user_fullName")}
        >
          {errorsForm.user_fullName && (
            <ErrorInput>{errorsForm.user_fullName.message}</ErrorInput>
          )}
        </InputAuth>
        <InputAuth
          id="phoneNumber"
          type="number"
          register={register("user_phoneNumber", {
            required: { value: true, message: "Vui lòng nhập số điện thoại" },
            validate: (phoneNumberInput) => {
              if (!phoneNumberInput.match(CONSTANT.REGEX_PHONE))
                return "Số điện thoại không hợp lệ, vui lòng kiểm tra lại";
            },
          })}
          label="Nhập số điện thoại"
          hasValue={!!watch("user_phoneNumber")}
        >
          {errorsForm.user_phoneNumber && (
            <ErrorInput>{errorsForm.user_phoneNumber.message}</ErrorInput>
          )}
        </InputAuth>
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
        >
          <Note>(*)Hóa đơn VAT khi mua hàng sẽ được gửi về email này </Note>
          {errorsForm.user_email && (
            <ErrorInput>{errorsForm.user_email.message}</ErrorInput>
          )}
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
        >
          <>
            <Note>(*)Mật khẩu phải nhiều hơn 6 ký tự</Note>
            {errorsForm.user_password && (
              <ErrorInput>{errorsForm.user_password.message}</ErrorInput>
            )}
          </>
        </InputAuth>
        <InputAuth
          id="comfirmPassword"
          type="password"
          register={register("reconfirmPassword", {
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
          hasValue={!!watch("reconfirmPassword")}
        >
          {errorsForm.reconfirmPassword && (
            <ErrorInput>{errorsForm.reconfirmPassword.message}</ErrorInput>
          )}
        </InputAuth>
        <InputAuth
          id="promoCode"
          type="promoCode"
          register={register("user_promoCode")}
          label="Nhập mã giới thiệu (nếu có)"
          hasValue={!!watch("user_promoCode")}
        />
        <Button $width="100%">Đăng Ký</Button>
        <LoginRegisterLabel>
          <p>Hoặc đăng nhập bằng</p>
        </LoginRegisterLabel>
      </Form>
      <LogoAuth />
      <LoginNow>
        <p>Bạn đã có tài khoảng?</p>
        <Link to={`/${PATH_USER.login}`}>Đăng nhập ngay</Link>
      </LoginNow>
    </RegisterContainer>
  );
};

export default RegisterPage;
