import React, { useRef, useState } from "react";
import styled from "styled-components";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"; // Import React Icons
import { useForm } from "react-hook-form";
import { IUserCreate } from "@/interfaces/user.interface";
import { Button, InputAuth } from "@/components";
import InputButtonAuth from "@/components/InputButtonAuth";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;
const ContainerTop = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h2`
  margin-bottom: 20px;
`;

const ImgLogo = styled.img`
  width:150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleForget = styled.p`
  position: relative;
  left: 39%;
  bottom: 15px;
  cursor: pointer;
  margin:20px;
`;

const LoginPage: React.FC = () => {
  const { handleSubmit, register, formState, watch } = useForm<IUserCreate>();
  const onSubmit = (dataForm) => {
    console.log();
  };
  return (
    <LoginContainer onSubmit={handleSubmit(onSubmit)}>
      
      <ContainerTop>
        <Title>Đăng nhập Smember</Title>
          <ImgLogo
            src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
            alt="logoLogin"
          />
      </ContainerTop>
     
      <Form>
        <InputAuth
          id="userName"
          type="text"
          register={register("user_email")}
          label="Nhập số điện thoại/email"
          hasValue={!!watch("user_email")}
        />
        <InputAuth
          id="password"
          type="password"
          register={register("user_password")}
          label="Nhập mật khẩu"
          hasValue={!!watch("user_password")}
        />
        <TitleForget>Quen mat khau?</TitleForget>
        <Button>Đăng Nhập</Button>
      </Form>
      <InputButtonAuth/>
    </LoginContainer>
  );
};

export default LoginPage;
