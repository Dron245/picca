import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filter.js';

export const store = configureStore({
	reducer: {
		filter
	},
});
