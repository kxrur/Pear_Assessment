import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'; // Example reducer
import registrationReducer from './registrationSlice'; // We'll create this next

const store = configureStore({
  reducer: {
    counter: counterReducer,
    registration: registrationReducer, // Add registration reducer
  },
});

// Define types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
