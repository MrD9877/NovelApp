import { Unlocked } from "@/schema/user";
import { Library } from "@/validators/library";
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
    addToLibrary: (state, action: { type: string; payload: Library }) => {
      const check = state.library.findIndex((novel) => novel.novelId === action.payload.novelId);
      if (check === -1) {
        state.library.push(action.payload);
      }
    },
    removeFromLibrary: (state, action: { type: string; payload: string }) => {
      state.library = state.library.filter((novel) => novel.novelId !== action.payload);
    },
    toggleFromLibrary: (state, action: { type: string; payload: string }) => {
      const check = state.library.findIndex((novel) => novel.novelId === action.payload);
      if (check === -1) {
        state.library.push({ novelId: action.payload, lastRead: 1 });
      } else {
        state.library = state.library.filter((novel) => novel.novelId !== action.payload);
      }
    },
  },
});

export const { setUser, addToLibrary, removeFromLibrary, toggleFromLibrary } = userSlice.actions;

export const store = configureStore({
  reducer: userSlice.reducer,
});
