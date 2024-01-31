import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slice/commonSlice";

const store = configureStore({
    reducer: {
        commonState: commonSlice,
    },
});

export default store;
