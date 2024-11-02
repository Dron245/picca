import { configureStore } from '@reduxjs/toolkit';
import filter  from './filter/slice';
import cart from './cart/slice';
import  pizzas  from './pizza/slice';
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