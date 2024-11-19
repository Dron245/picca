import { configureStore } from '@reduxjs/toolkit';
import filter  from './filter/slice';
import cart from './cart/slice';
import  pizzas  from './pizza/slice';
import { useDispatch } from 'react-redux';
import  test from './test/test';

export const store = configureStore({
	reducer: {
		pizzas,
		filter,
		cart,
		test,
	},
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 