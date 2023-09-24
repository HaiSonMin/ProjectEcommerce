import CONSTANT from "@/constant/value-constant";
import { ILocalStoreUser } from "@/helpers";
import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  userId: string;
  userEmail: string;
  userFullName: string;
  accessToken: string;
}
const initializeStateFromLocalStorage = (): IInitialState => {
  const dataStorage = localStorage.getItem(CONSTANT.USER_TOKEN_NAME);
  if (!dataStorage)
    return {
      userId: "",
      userFullName: "",
      userEmail: "",
      accessToken: "",
    };
  const { userId, userFullName, userEmail, accessToken } = JSON.parse(
    dataStorage
  ) as ILocalStoreUser;

  return {
    userId,
    userEmail,
    userFullName,
    accessToken,
  };
};

const initialState: IInitialState = initializeStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: { payload: IInitialState }) {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.userFullName = action.payload.userFullName;
      state.accessToken = action.payload.accessToken;
    },
    deleteUser(state) {
      state.userId = "";
      state.userEmail = "";
      state.userFullName = "";
      state.accessToken = "";
    },
  },
});

export default userSlice.reducer;

export const { setUser, deleteUser } = userSlice.actions;

export const getUser = (state: { user: IInitialState }) => state.user;
