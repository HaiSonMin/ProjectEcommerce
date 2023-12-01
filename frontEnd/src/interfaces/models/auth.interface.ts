import { IUser } from './user.interface';

export interface IAuth {
  OTPCode: string;
  tokenCaptcha: string;
  timeExpireOTP: number;
  optionConfirm: string; // 001 => Register, 002 => ResetPassword
}

export interface IAuthCreateSessionOTP
  extends Pick<IAuth, 'tokenCaptcha' | 'timeExpireOTP' | 'optionConfirm'> {}

export interface IAuthConfirmOTP extends Pick<IAuth, 'OTPCode'> {}

export interface IAuthLogin
  extends Pick<IUser, 'user_email' | 'user_password'>,
    Pick<IAuth, 'tokenCaptcha'> {}

export interface IAuthRegister
  extends Pick<
      IUser,
      'user_fullName' | 'user_email' | 'user_phoneNumber' | 'user_password'
    >,
    Pick<IAuth, 'tokenCaptcha'> {
  user_confirmPassword: string;
  user_referralCode?: string;
}

export interface IAuthResetPassword extends Pick<IUser, 'user_password'> {
  user_confirmPassword: string;
}
