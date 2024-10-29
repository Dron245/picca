import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filter';
import cart from './slises/cartSlice';
import  pizzas  from './slises/pizzaSlice';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas
	},
});

export type RootState = ReturnType<typeof store.getState>