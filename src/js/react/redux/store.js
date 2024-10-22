import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filter.js';
import cart from './slises/cartSlice.js';
import  pizzas  from './slises/pizzaSlice.js';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas
	},
});
