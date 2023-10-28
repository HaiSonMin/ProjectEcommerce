import { Button, Heading, InputAuth, SpinnerLogo } from "@/components/shared";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IAuthResetPassword } from "@/interfaces/models/auth.interface";
import { UseAuthApi } from "@/apis-use";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "@/constant/path-router";

const ResetPasswordLayoutStyled = styled.div`
  margin-top: 3rem;
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
export default function ResetPasswordLayout() {
  const navigate = useNavigate();
  const { handleSubmit, register, formState, watch, getValues } =
    useForm<IAuthResetPassword>();
  const { errors: errorsForm } = formState;

  const { confirmResetPassword, isConfirmingResetPassword } =
    UseAuthApi.confirmResetPassword();

  const onSubmit = (dataForm: IAuthResetPassword) => {
    confirmResetPassword(
      {
        user_password: dataForm["user_password"],
        user_confirmPassword: dataForm["user_confirmPassword"],
      },
      { onSuccess: () => navigate(`/${PATH_AUTH.login}`) }
    );
  };

  return (
    <ResetPasswordLayoutStyled>
      {isConfirmingResetPassword && <SpinnerLogo />}
      <ContainerTop>
        <Header>
          <Heading $as="h3">Tạo lại mật khẩu mới</Heading>
        </Header>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logoLogin"
        />
      </ContainerTop>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          error={errorsForm["user_password"]?.message}
        />
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
        <Button $width="70rem">Đặt lại mật khẩu</Button>
      </Form>
    </ResetPasswordLayoutStyled>
  );
}
