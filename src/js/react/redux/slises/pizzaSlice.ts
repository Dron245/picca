import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { RootState } from '../store';

export enum CartStatusEnum {
	LOAD = 'load',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type PizzaBlock = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
	count: number;
};

export interface PizzasSLice {
	items: PizzaBlock[];
	status: string;
	// sizeindex: ,
}

export type SearchPizzaParams = {
	url: string;
	categoryIndex: string;
	search: string;
	sortBy: string;
	sortDirection: string;
	paginationNumber: string;
};
export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async (params: SearchPizzaParams) => {
		const { url, categoryIndex, search, sortBy, sortDirection, paginationNumber } =
			params;
		const { data } = await Axios.get(
			`${url}?${categoryIndex}&${sortBy}&order=${sortDirection}&
			page=${paginationNumber}&limit=5&${search}`
		);
		return data as PizzaBlock[];
	}
);

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
			state.status = CartStatusEnum.LOAD;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = CartStatusEnum.SUCCESS;
			state.items = action.payload;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = CartStatusEnum.ERROR;
			alert('ошибка в получении пицц');
			state.items = [];
		});
	},
});

export const selectorPizzasData = (state: RootState) => state.pizzas;
export const { setpizzas } = pizzas.actions;
export default pizzas.reducer;
