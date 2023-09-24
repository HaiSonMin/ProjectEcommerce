import { createSlice } from "@reduxjs/toolkit";
import { EnumOptionConfirmOTP } from "@/enum";

interface IInitialState {
  userEmail: string;
  optionConfirm: EnumOptionConfirmOTP;
  timeExpireOTP: number;
}

const initialState: IInitialState = {
  userEmail: "",
  optionConfirm: EnumOptionConfirmOTP.REGISTER,
  timeExpireOTP: 1,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setUserEmailOTP(state, action) {
      state.userEmail = action.payload;
    },
    setTimeExpireOTP(state, action) {
      state.timeExpireOTP = action.payload;
    },
    setOptionConfirmOTP(state, action) {
      state.optionConfirm = action.payload;
    },
  },
});

export default otpSlice.reducer;

export const { setTimeExpireOTP, setUserEmailOTP, setOptionConfirmOTP } =
  otpSlice.actions;

export const getUserEmailOTP = (state: { otp: IInitialState }) =>
  state.otp.userEmail;

export const getOptionConfirmOTP = (state: { otp: IInitialState }) =>
  state.otp.optionConfirm;

export const getTimeExpireOTP = (state: { otp: IInitialState }) =>
  state.otp.timeExpireOTP;
