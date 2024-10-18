import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});

// Define types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
