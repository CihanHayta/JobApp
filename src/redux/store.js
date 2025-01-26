import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./slicies/jobSlice";

const store = configureStore({ reducer:{ jobSlice } });

export default store;