import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slises/slice.js';

export const store = configureStore({
	reducer: counterReducer,
});