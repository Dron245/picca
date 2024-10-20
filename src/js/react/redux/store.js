import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filter.js';
import cart from './slises/cartSlice.js';

export const store = configureStore({
	reducer: {
		filter,
		cart
	},
});
