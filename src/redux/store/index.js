import { configureStore } from '@reduxjs/toolkit';
import reducer from "../reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = configureStore({
  reducer: reducer,
  middleware:[thunk, logger]
});
