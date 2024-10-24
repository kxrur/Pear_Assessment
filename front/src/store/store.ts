import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import assessReducer from './assessSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    assess: assessReducer
  },
});

// Define types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
