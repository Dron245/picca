import { configureStore } from '@reduxjs/toolkit';
import filter from './slises/filter';
import cart from './slises/cartSlice';
import  pizzas  from './slises/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas
	},
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 