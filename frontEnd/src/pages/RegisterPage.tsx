import { Button, InputAuth, InputButtonAuth } from "@/components";
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IUserCreate } from "./../interfaces/user.interface";
import toast from "react-hot-toast";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 20px;
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

const Pnote = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: silver;
  font-style: italic;
  text-align: left;
`;

const RegisterPage: React.FC = () => {
  const { handleSubmit, register, formState, watch, getValues } =
    useForm<IUserCreate>();
  const { errors: errorsForm } = formState;
  const onSubmit = (dataForm) => {

  };
  return (
    <RegisterContainer onSubmit={handleSubmit(onSubmit)}>
      <Title>Đăng ký Smember</Title>
      <ImgLogo
        src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.77d4065.png"
        alt="logoLogin"
      />
      <Form>
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
            <Pnote style={{ color: "red" }}>
              {errorsForm.user_fullName.message}
            </Pnote>
          )}
        </InputAuth>
        <InputAuth
          id="phoneNumber"
          type="number"
          register={register("user_phoneNumber",{required: {value:true, message:'Vui lòng nhập số điện thoại'}})}
          label="Nhập số điện thoại"
          hasValue={!!watch("user_phoneNumber")}
        >
             {errorsForm.user_fullName && ( 
            <Pnote style={{ color: "red" }}>
              {errorsForm.user_fullName.message}
            </Pnote>
          )}
        </InputAuth>
        <InputAuth
          id="userEmail"
          type="email"
          register={register("user_email")}
          label="Nhập email"
          hasValue={!!watch("user_email")}
        >
          <Pnote>(*)Hóa đơn VAT khi mua hàng sẽ được gửi về email này </Pnote>
        </InputAuth>
        <InputAuth
          id="password"
          type="password"
          register={register("user_password")}
          label="Nhập mật khẩu"
          hasValue={!!watch("user_password")}
        >
          <Pnote>
            Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường, 1 chữ in hoa,
            1 chữ số, 1 ký tự đặc biệt
          </Pnote>
        </InputAuth>
        <InputAuth
          id="comfirmPassword"
          type="password"
          register={register("reconfirmPassword", {
            validate: (value) => {
              if (value.trim() !== getValues("user_password"))
                return "xác nhận mật khẩu không khớp";
            },
          })}
          label="Nhập mật khẩu"
          hasValue={!!watch("reconfirmPassword")}
        >
          {errorsForm.reconfirmPassword && ( // Hiển thị chỉ khi confirmPasswordValid là false
            <Pnote style={{ color: "red" }}>
              Mật khẩu xác nhận không khớp.
            </Pnote>
          )}
        </InputAuth>
        <InputAuth
          id="promoCode"
          type="promoCode"
          register={register("user_promoCode")}
          label="Nhập mã giới thiệu (nếu có)"
          hasValue={!!watch("user_promoCode")}
        />
        <Button>Đăng Ký</Button>
      </Form>
      <InputButtonAuth/>
    </RegisterContainer>
  );
};

export default RegisterPage;
