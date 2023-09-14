import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 700px;
  padding-top: 2rem;
  font-size: 16px;
  left: 0px;
  border: none;
  border-radius: 5px;
  border-bottom: solid 2px #f0f0f0;
  &:focus {
    border-color: red;
    border-bottom: solid 2px red;
    outline: none;
  }
`;

const Label = styled.label<{ focused: boolean; hasValue: boolean }>`
  position: absolute;
  width: max-content;
  left: 0px;
  cursor: auto;
  top: ${(props) => (props.focused || props.hasValue ? "0" : "19px")};
  font-size: ${(props) => (props.focused || props.hasValue ? "12px" : "16px")};
  color: ${(props) => (props.focused ? "red" : "var(--color-grey-500)")};
  transition:
    top 0.3s,
    font-size 0.3s;
`;

const ShowPasswordButton = styled.button<{ showPassword: boolean }>`
  padding-right:10px;
  position: absolute;
  right: 0px;
  top: 3rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) => (props.showPassword ? "red" : "inherit")};
`;

interface IProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  register: any;
  hasValue: boolean;
  children?: React.ReactNode;
}

export default function InputAuth({
  type,
  id,
  register,
  label,
  hasValue,
  children,
}: IProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = (value: string) => {
    setFocused(false);
  };
  const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <InputContainer>
      <Input
        type={type !== "password" ? type : showPassword ? "text" : type}
        id={id}
        {...register}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete
      />
      <Label htmlFor={id} focused={focused} hasValue={hasValue}>
        {label}
      </Label>
      {type === "password" && (
        <ShowPasswordButton
          type="button"
          onClick={toggleShowPassword}
          showPassword={showPassword}
        >
          {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
        </ShowPasswordButton>
      )}
      {children}
    </InputContainer>
  );
}
