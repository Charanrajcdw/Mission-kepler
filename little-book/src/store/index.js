import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlice.js";

export const store = configureStore({ reducer: { blogs: blogSlice.reducer } });
export * from "./slices/blogSlice.js";
