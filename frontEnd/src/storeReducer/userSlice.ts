import CONSTANT from "@/constant/value-constant";
import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  accessToken: string;
  user: {
    userId: string;
    userName: string;
    userRole: string;
  };
}
const initializeStateFromLocalStorage = (): IInitialState => {
  const dataStorage = localStorage.getItem(CONSTANT.USER_TOKEN_NAME);
  if (!dataStorage)
    return {
      user: {
        userId: "",
        userName: "",
        userRole: "",
      },
      accessToken: "",
    };
  const { userId, userName, userRole, accessToken } = JSON.parse(dataStorage);

  return {
    user: {
      userId,
      userName,
      userRole,
    },
    accessToken,
  };
};

const initialState: IInitialState = initializeStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setATUser(state, action) {
      state.accessToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    deleteUser(state) {
      state.user = { userId: "", userName: "", userRole: "" };
      state.accessToken = "";
    },
  },
});

export default userSlice.reducer;
export const { setUser, setATUser, deleteUser } = userSlice.actions;

export const getATUser = (state: { user: IInitialState }) =>
  state.user.accessToken;
export const getUser = (state: { user: IInitialState }) => state.user.user;
