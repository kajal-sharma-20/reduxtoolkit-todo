import { configureStore } from '@reduxjs/toolkit';
import todoslice from '../features/todoslice.js';
export const store = configureStore({
  reducer: { 
    todos:todoslice,
  },
})