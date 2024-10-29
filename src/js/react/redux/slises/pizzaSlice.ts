import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { RootState } from '../store';

type PizzaBlock = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
	count: number;
}
export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async (params: Record<string, string>) => {
		const { url, categoryIndex, search, sortBy,
			sortDirection, paginationNumber } = params;
		const { data } = await Axios.get(
			`${url}?${categoryIndex}&${sortBy}&order=${sortDirection}&
			page=${paginationNumber}&limit=5&${search}`
		);
		return data as PizzaBlock[];
	}
);

interface PizzasSLice {
	items: PizzaBlock[];
	status: string;
	// sizeindex: ,
}

const initialState: PizzasSLice = {
	items: [],
	status: '',
	// sizeindex: 0,
};

export const pizzas = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setpizzas(state, action: PayloadAction<PizzaBlock[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = 'load';
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = 'succes';
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'error';
			alert('ошибка в получении пицц');
			state.items = [];
		});
	},
});

export const selectorPizzasData = (state: RootState) => state.pizzas;
export const { setpizzas } = pizzas.actions;
export default pizzas.reducer;
