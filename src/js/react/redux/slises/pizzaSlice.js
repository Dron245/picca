import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async ({ url, categoryIndex, search, sort, sortDirection, paginationR }) => {
		const {data} = await Axios.get(
			`${url}?${categoryIndex}&${sort}&order=${sortDirection}&page=${paginationR}&limit=4&${search}`
		);
		return data;
	}
);
const initialState = {
	items: [],
	status: '',
};

export const pizzas = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setpizzas(state, action) {
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
			state.items = [];
		});
	},
});
export const { setpizzas } = pizzas.actions;

export default pizzas.reducer;
