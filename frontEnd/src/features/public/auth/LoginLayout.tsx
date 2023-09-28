import styled from "styled-components";
import { useForm } from "react-hook-form";
import IUser from "@/interfaces/user.interface";
import {
  Button,
  Heading,
  LogoAuth,
  InputAuth,
  SpinnerLogo,
  LoginRegisterLabel,
} from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { PATH_USER } from "@/constant";
import { UseAuthApi } from "@/apis-use";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import CONSTANT from "@/constant/value-constant";
import { setUser } from "@/storeReducer/public/userSlice";
import { IAuthLoginResultApi } from "@/apis-results/IAuthResultApi";
import { IAuthLogin } from "@/interfaces/auth.interface";
import ReCAPTCHA from "react-google-recaptcha";
import {
  setOptionConfirmOTP,
  setUserEmailOTP,
} from "@/storeReducer/public/otpSlice";
import { EnumOptionConfirmOTP } from "@/enum";
import { da } from "date-fns/locale";
import { ILocalStoreUser } from "@/helpers";

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
const ForgetPassword = styled.p`
  align-self: flex-end;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--color-primary);
  font-style: italic;
  margin-bottom: 1rem;
  margin-top: -1rem;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, login } = UseAuthApi.login();
  const refCaptcha = useRef<ReCAPTCHA>(null);

  const { handleSubmit, register, formState, watch } = useForm<IAuthLogin>();
  const { errors: errorsForm } = formState;

  const onSubmit = (dataForm: IAuthLogin) => {
    const tokenReCaptcha = refCaptcha?.current?.getValue();
    if (!tokenReCaptcha) return toast.error("Hãy vui lòng xác thực ReCaptcha");

    const dataLogin: IAuthLogin = {
      user_email: dataForm["user_email"],
      user_password: dataForm["user_password"],
      tokenCaptcha: tokenReCaptcha,
    };

    login(dataLogin, {
      onSuccess: ({
        metadata: data,
      }: Pick<IAuthLoginResultApi, "metadata">) => {
        refCaptcha.current?.reset();
        const userStorage: ILocalStoreUser = {
          userId: data.user._id,
          userEmail: data.user.user_email,
          userFullName: data.user.user_fullName,
          userRole: data.user.user_role,
        };
        localStorage.setItem(
          CONSTANT.AT_NAME_LOCAL_STORE,
          JSON.stringify(data.accessToken)
        );
        localStorage.setItem(
          CONSTANT.USER_NAME_LOCAL_STORE,
          JSON.stringify(userStorage)
        );
        dispatch(
          setUser(userStorage)
        );
        navigate("/");
      },
      onError: () => refCaptcha.current.reset(),
    });
  };

  const { isCreatingSessionResetPassword, createSessionResetPassword } =
    UseAuthApi.createSessionResetPassword();

  const handleForgetPassword = () => {
    if (!watch("user_email"))
      return toast.error("Vui lòng nhập email để xác nhận OTP");
    if (!refCaptcha?.current?.getValue())
      return toast.error("Hãy vui lòng xác thực ReCaptcha");
    createSessionResetPassword(
      { user_email: watch("user_email") },
      {
        onSuccess: () => {
          refCaptcha.current.reset();
          dispatch(setUserEmailOTP(watch("user_email")));
          dispatch(setOptionConfirmOTP(EnumOptionConfirmOTP.RESET_PASSWORD));
          navigate(`/${PATH_USER.generateOTP}`);
        },
        onError: () => refCaptcha.current.reset(),
      }
    );
  };

  const isLoading = isCreatingSessionResetPassword || isLogin;

  return (
    <LoginLayoutStyled>
      {isLoading && <SpinnerLogo />}
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
        <ForgetPassword onClick={handleForgetPassword}>
          Quên mật khẩu?
        </ForgetPassword>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
          size="normal"
          ref={refCaptcha}
        />
        <Button $width="100%" className="mt-[1.5rem]">
          Đăng Nhập
        </Button>
        <LoginRegisterLabel>
          <p>Hoặc đăng ký bằng</p>
        </LoginRegisterLabel>
      </Form>
      <LogoAuth />
      <RegisterNow>
        <p>Bạn chưa có tài khoản?</p>
        <Link to={`/${PATH_USER.register}`}>Đăng ký ngay</Link>
      </RegisterNow>
      <SeePromotion to={`/${PATH_USER.Incentives}`}> Xem chính sách ưu đãi Smember </SeePromotion>
    </LoginLayoutStyled>
  );
}
