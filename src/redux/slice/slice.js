import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        value:[{email: 'kumar', password: '123212'}],
    },
    reducers: {
        register : (state, action) => {
        state.value+= action.payload;
    },
    }
})

export const {
    register
} = userSlice.actions;

export default userSlice.reducer