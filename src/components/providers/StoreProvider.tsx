"use client";
import { store } from "@/redux/userSlice";
import React from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
