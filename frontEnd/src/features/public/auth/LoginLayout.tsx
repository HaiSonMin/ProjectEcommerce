import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import IUser from "@/interfaces/user.interface";
import {
  Button,
  Heading,
  InputAuth,
  LoginRegisterLabel,
  LogoAuth,
  SnipLogo,
  SpinnerMini,
} from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { PATH_USER } from "@/constant";
import CONSTANT from "@/constant/value-constant";
import UseAuthApi from "./UseAuthApi";
import { IAuthLoginResultApi } from "@/api-types/IAuthResultApi";

const LoginLayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 6rem;
`;

const ContainerTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
const TitleForget = styled(Link)`
  align-self: flex-end;
  bottom: 1.5rem;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--color-primary);
  font-style: italic;
  margin-bottom: 1rem;
`;

const RegisterNow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  & p {
    color: var(--color-grey-500);
    color: var(--color-text);
  }

  & a {
    color: var(--color-primary);
    font-weight: 600;
  }
`;

const SeePromotion = styled(Link)`
  text-decoration: underline;
  color: var(--color-primary);
  margin-top: 1rem;
  font-weight: 600;

  &:hover {
    font-style: italic;
  }
`;

export default function LoginLayout() {
  const navigate = useNavigate();

  const { isLogin, login } = UseAuthApi.login();

  const { handleSubmit, register, formState, watch } =
    useForm<Pick<IUser, "user_email" | "user_password">>();
  const { errors: errorsForm } = formState;

  const onSubmit = (dataForm: Pick<IUser, "user_email" | "user_password">) => {
    const dataLogin: Pick<IUser, "user_email" | "user_password"> = {
      user_email: dataForm["user_email"],
      user_password: dataForm["user_password"],
    };
    login(dataLogin, {
      onSuccess: ({
        metadata: data,
      }: Pick<IAuthLoginResultApi, "metadata">) => {
        const dataStorage = {
          token: data.accessToken,
          userName: data.user.user_userName,
        };
        localStorage.setItem(
          CONSTANT.USER_TOKEN_NAME,
          JSON.stringify(dataStorage)
        );
        navigate("/");
      },
    });
  };

  return (
    <LoginLayoutStyled>
      {isLogin && <SnipLogo/>}
      <ContainerTop>
        <Header>
          <Heading $as="h3">Đăng nhập Smember</Heading>
        </Header>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logoLogin"
        />
      </ContainerTop>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputAuth
          id="userName"
          type="text"
          register={register("user_email", {
            required: { value: true, message: "Vui lòng bổ sung email" },
            validate: (emailInput) => {
              if (!emailInput.match(CONSTANT.REGEX_EMAIL))
                return "Email không hợp lệ";
            },
          })}
          label="Nhập số điện thoại/email"
          hasValue={!!watch("user_email")}
          error={errorsForm.user_email?.message}
        />
        <InputAuth
          id="password"
          type="password"
          register={register("user_password", {
            required: {
              value: true,
              message: "Vui lòng bổ sung mật khẩu",
            },
          })}
          label="Nhập mật khẩu"
          hasValue={!!watch("user_password")}
          error={errorsForm.user_password?.message}
        />
        <TitleForget to={`/${PATH_USER.forgetpassword}`}>
          Quên mật khẩu?
        </TitleForget>
        <Button $width="100%">Đăng Nhập</Button>
        <LoginRegisterLabel>
          <p>Hoặc đăng ký bằng</p>
        </LoginRegisterLabel>
      </Form>
      <LogoAuth />
      <RegisterNow>
        <p>Bạn chưa có tài khoản?</p>
        <Link to={`/${PATH_USER.register}`}>Đăng ký ngay</Link>
      </RegisterNow>
      <SeePromotion to={"#"}> Xem chính sách ưu đãi Smember </SeePromotion>
    </LoginLayoutStyled>
  );
}
