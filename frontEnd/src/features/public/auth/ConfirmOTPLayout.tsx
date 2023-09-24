import styled from "styled-components";
import { useState, useRef, useEffect, useMemo } from "react";
import { Button, Heading, SpinnerLogo } from "@/components";
import { useSelector } from "react-redux";
import { getUser } from "@/storeReducer/public/userSlice";
import { UseAuthApi } from "@/apis-use";
import {
  getOptionConfirmOTP,
  getTimeExpireOTP,
  getUserEmailOTP,
} from "@/storeReducer/public/otpSlice";
import { EnumOptionConfirmOTP } from "@/enum";
import { useNavigate } from "react-router-dom";
import { PATH_USER } from "@/constant";

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

const Title = styled.p`
  text-align: left;
  font-size: 1.3rem;
  color: var(--color-text);
  margin-bottom: 2rem;

  & span {
    font-weight: 600;
  }
`;

const OTPBox = styled.div`
  margin-top: 20%;
  width: 500px;
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
    outline: solid 1px var(--color-primary);
  }
`;

const BoxTitle = styled.div`
  font-size: 1.4rem;
  grid-column: 1 / span 6;
  grid-row: 3;
  span {
    color: var(--color-primary);
    font-weight: 600;
    cursor: pointer;
  }
  a:hover {
    border-bottom: solid 1px var(--color-primary);
  }
`;

export default function OTPLayout() {
  const navigate = useNavigate();
  const userEmail: string = useSelector(getUserEmailOTP);
  const timeExpire: number = useSelector(getTimeExpireOTP);
  const optionConfirm: string = useSelector(getOptionConfirmOTP);
  const [time, setTime] = useState<number>(timeExpire);

  const displayTime = time < 10 ? `0${time}` : time.toString();

  const emailDisplay =
    userEmail.slice(0, 2) +
    "********" +
    userEmail.slice(userEmail.indexOf("@") - 1);

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  useEffect(() => {
    const countDownSecond = setInterval(() => {
      if (time > 0) setTime((prevTime) => prevTime - 1);
      else clearInterval(countDownSecond);
    }, 1000);
    return () => clearInterval(countDownSecond);
  }, [time]);

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
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const { confirmRegister, isConfirmingRegister } =
    UseAuthApi.confirmRegister();
  const { confirmOTPResetPassword, isConfirmingOTPResetPassword } =
    UseAuthApi.confirmOTPResetPassword();

  const handleConfirmOTP = () => {
    const OTPCode = otpValues.join("");
    if (optionConfirm === EnumOptionConfirmOTP.REGISTER)
      confirmRegister(
        { OTPCode },
        {
          onSuccess: () => navigate(`/${PATH_USER.login}`),
        }
      );
    if (optionConfirm === EnumOptionConfirmOTP.RESET_PASSWORD) {
      console.log("OTPCode:::", OTPCode);
      confirmOTPResetPassword(
        { OTPCode },
        {
          onSuccess: () => {
            navigate(`/${PATH_USER.resetPassword}`);
          },
        }
      );
    }
  };

  const isLoading = isConfirmingRegister || isConfirmingOTPResetPassword;

  return (
    <ContainerOTP>
      {isLoading && <SpinnerLogo />}
      {optionConfirm === EnumOptionConfirmOTP.REGISTER ? (
        <Heading $as="h3">Đăng ký tài khoảng mới</Heading>
      ) : (
        <Heading $as="h3">Quên mật khẩu</Heading>
      )}
      <OTPBox>
        <Title>
          Nhập mã OTP được gửi qua <span>{emailDisplay}</span>
        </Title>
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
          {time > 0 ? (
            <BoxTitle>
              Mã OTP sẽ hết hạn sau <span>{displayTime}</span> giây
            </BoxTitle>
          ) : (
            <BoxTitle>
              Mã OTP đã hết hạn <span>Gửi lại</span>
            </BoxTitle>
          )}
        </Grid>
        <Button onClick={handleConfirmOTP}>Xác nhận</Button>
      </OTPBox>
    </ContainerOTP>
  );
}
