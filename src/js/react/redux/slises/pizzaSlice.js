import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async ({ url, categoryIndex, search, sort, sortDirection }) => {
		console.log(1);
		const {data} = await Axios.get(
			`${url}?${categoryIndex}&${sort}&order=${sortDirection}&page=${paginationR}&limit=4&${search}`
		);
		console.log(data);
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
			// state.items = [];
			console.log("lo");
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = 'succes';
			state.items = action.payload;
			console.log(2);
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'error';
			state.items = [];
		});
	},
});
export const { setpizzas } = pizzas.actions;

export default pizzas.reducer;
