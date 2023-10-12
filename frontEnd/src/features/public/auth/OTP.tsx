import styled from "styled-components";
import { useState, useRef } from "react";
import { Button } from "@/components/shared";

const ContainerOTP = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  text-align: center;
  gap: 2rem;
  padding: 2rem 30%;
  h4 {
    font-size: 2rem;
  }
`;

const OTPBox = styled.div`
  margin-top: 20%;
  width: 500px;
  p {
    text-align: left;
    margin-bottom: 2rem;
  }
  Button {
    margin-top: 2rem;
    width: 100%;
  }
`;

const Grid = styled.form`
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-template-rows: auto;

  gap: 10px;
  justify-items: center;
`;

const BoxInput = styled.input`
  font-size: 1.5rem;
  background: var(--color-grey-100);
  border: solid 0.1rem var(--color-grey-200);
  width: 50px;
  padding: 1.5rem;
  text-align: center;
  border-radius: 5px;
  &:focus {
    background: var(--color-primary-light);
    outline: solid 0.1rem var( --color-primary);
    
  }
`;

const BoxTitle = styled.div`
  grid-column: 1 / span 6;
  grid-row: 3;
  a {
    color: var(--color-red-700);
  }
  a:hover {
    border-bottom: solid 0.1rem var(--color-red-700);
  }
`;

export default function OTPLayout() {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value.length === 1 && index < inputRefs.length - 1) {
        // Automatically move focus to the next input by setting tabIndex
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };
  
  return (
    <ContainerOTP>
      <h4>Quên mật khẩu</h4>
      <OTPBox>
        <p>Nhập mã OTP được gửi qua </p>
        <Grid>
          {otpValues.map((value, index) => (
            <BoxInput
              key={index}
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
            />
          ))}
          <BoxTitle>
            Mã OTP đã hết hạn <a>Gửi lại</a>
          </BoxTitle>
        </Grid>
        <Button>Xác nhận</Button>
      </OTPBox>
    </ContainerOTP>
  );
}
