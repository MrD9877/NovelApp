import { Library, Unlocked } from "@/schema/user";
import { createSlice, configureStore } from "@reduxjs/toolkit";

export type StoreState = {
  userName?: null | string;
  email?: null | string;
  library?: Library[];
  unlocked?: Unlocked[];
};

const initialState: StoreState = {
  userName: null,
  email: null,
  library: [],
  unlocked: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { type: string; payload: StoreState }) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.library = action.payload.library;
      state.unlocked = action.payload.unlocked;
    },
  },
});

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
});
