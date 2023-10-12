import React, { useState } from "react";
import styled from "styled-components";

const LoginBox = styled.div`
  text-align: center;
  margin: 0 20%;
  font-family: 'Times New Roman', Times, serif;
`;

const UserBox = styled.div`
  position: relative;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: Black;
  margin-bottom: 2rem;
  border: none;
  border-bottom: 0.5px solid #d8c6c6;
  outline: none;
  background: transparent;
  font-weight: 100;
  &:focus ~ label,
  &:valid ~ label {
    top: -20px;
    left: 0;
    color: red;
    font-size: 16px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #837c7c;
  pointer-events: none;
  transition: 0.5s;
  outline: none;
  margin-left: 1rem;
  font-weight: 100;
`;

export default function InputFloat() {
  const [DataForm, setDataForm] = useState(["Họ và tên: ", "Giới tính"]);
  const [InputData, setInputData] = useState<string>("");
  return (
    <LoginBox>
      <UserBox>
        <InputField
          type="text"
          name=""
          required
          value=""
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Họ và tên:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Giới tính:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Số điện thoại:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Sinh nhật:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Ngày tham gia Smember:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Tổng tiền tích lũy từ 01/01/2022:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Tổng tiền đã mua sắm:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Địa chỉ:</Label>
      </UserBox>
      <UserBox>
        <InputField
          type="password"
          name=""
          required
          value={DataForm[2]}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Label>Đỏi mật khẩu:</Label>
      </UserBox>
    </LoginBox>
  );
}
