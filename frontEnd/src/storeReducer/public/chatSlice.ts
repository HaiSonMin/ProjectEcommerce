import { IChatUser } from '@/interfaces/models';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  chat_roomId: string;
  chat_user: IChatUser;
}

const initialState: IInitialState = {
  chat_roomId: '',
  chat_user: {
    chat_userEmail: '',
    chat_userName: '',
    chat_userPhone: '',
    chat_userSex: '',
  },
};

const cartSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserChat(state, action: { payload: IInitialState }) {
      state.chat_roomId = action.payload.chat_roomId;
      state.chat_user = action.payload.chat_user;
    },
  },
});

export default cartSlice.reducer;

export const { setUserChat } = cartSlice.actions;

export const getUserChat = (state: { chat: IInitialState }) => state.chat;
