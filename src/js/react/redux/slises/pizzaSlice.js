import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async ({ url, categoryIndex, search, sort, sortDirection, paginationNumber }) => {
		const { data } = await Axios.get(
			`${url}?${categoryIndex}&${sort}&order=${sortDirection}&page=${paginationNumber}&limit=5&${search}`
		);
		return data;
	}
);
const initialState = {
	items: [],
	status: '',
	// sizeindex: 0,
	searhValue: '',
};

export const pizzas = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setpizzas(state, action) {
			state.items = action.payload;
		},

		setSearchValueR(state, action) {
			state.searhValue = action.payload;
			console.log(action.payload);
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

export const selectorPizzasData = (state) => state.pizzas;
export const { setpizzas, setSearchValueR } = pizzas.actions;
export default pizzas.reducer;
