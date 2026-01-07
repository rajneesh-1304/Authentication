import { configureStore } from "@reduxjs/toolkit";
import register from './slice/slice.js';

export default configureStore({
    reducer:{
        user: register,
    },
})