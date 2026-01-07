import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/slice.js';
import { loadState, saveState } from "./localstorage.js";

const persistedState =loadState();

const store= configureStore({
  reducer: {
    users: userReducer,
  },
  preloadedState:persistedState
});

store.subscribe(() => {
  saveState({
    user: store.getState().user
  });
});

export default store;