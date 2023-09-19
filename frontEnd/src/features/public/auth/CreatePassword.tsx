import {
  Button,
  Heading,
  LogoAuth,
  InputAuth,
  SpinnerLogo,
  LoginRegisterLabel,
} from "@/components";
import React from "react";
import styled from "styled-components";
import CONSTANT from "@/constant/value-constant";
import { PATH_USER } from "@/constant";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IUserCreate } from "@/interfaces/user.interface";
import { IAuthLoginResultApi } from "@/apis-results/IAuthResultApi";
import { setATUser, setUser } from "@/storeReducer/userSlice";

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
export default function CreatePasswordPage() {
  const { handleSubmit, register, formState, watch, getValues } =
    useForm<IUserCreate>();
  const { errors: errorsForm } = formState;
  return (
    <>
      <ContainerTop>
        <Header>
          <Heading $as="h3">Tạo lại mật khẩu mới</Heading>
        </Header>
        <ImgLogo
          src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="logoLogin"
        />
      </ContainerTop>
      <Form>
        <h4>Tạo mật khẩu mới</h4>
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
          error={errorsForm["reconfirmPassword"]?.message}
        />
        <Button $width="100%">Xác nhận</Button>
      </Form>
    </>
  );
}
