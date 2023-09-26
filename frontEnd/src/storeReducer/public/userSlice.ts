import CONSTANT from "@/constant/value-constant";
import { ILocalStoreUser } from "@/helpers";
import { createSlice } from "@reduxjs/toolkit";
interface IInitialState {
  userId: string;
  userEmail: string;
  userFullName: string;
  userRole: string;
}
const initializeStateFromLocalStorage = (): IInitialState => {
  const dataStorage = localStorage.getItem(CONSTANT.USER_NAME_LOCAL_STORE);
  if (!dataStorage)
    return {
      userId: "",
      userFullName: "",
      userEmail: "",
      userRole: "",
    };

  const { userId, userFullName, userEmail, userRole } = JSON.parse(
    dataStorage
  ) as ILocalStoreUser;

  return {
    userId,
    userEmail,
    userFullName,
    userRole,
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
      state.userRole = action.payload.userRole;
    },
    deleteUser(state) {
      state.userId = "";
      state.userEmail = "";
      state.userFullName = "";
      state.userRole = "";
    },
  },
});

export default userSlice.reducer;

export const { setUser, deleteUser } = userSlice.actions;

export const getUser = (state: { user: IInitialState }) => state.user;
