import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "../features/userSlice";
import scanReducer from "../features/scanSlice";
import targetReducer from "../features/targetSlice";
import metadataReducer from "../features/metadataSlice";

const store = (context) =>
  configureStore({
    reducer: {
      user: userReducer,
      scan: scanReducer,
      target: targetReducer,
      metadata: metadataReducer,
    },
  });
export default store;
export const wrapper = createWrapper(store);
