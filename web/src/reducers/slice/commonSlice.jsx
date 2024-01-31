import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common",
    initialState: {
        theme: 'light',
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
});

const { actions, reducer } = commonSlice;
export const { changeTheme } = actions;
export default reducer;
