import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	prices: 0,
	items: [],
};

export const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.items.push(action.payload);
			// state.prices += action.payload.price;
			state.prices = state.items.reduce((sum, obj) => sum + obj.price, 0);
			console.log(action.payload.price);
			// console.log(prices);
		},
		delItem(state, action) {
			state.items = state.items.filter((obj) => obj.index !== action.payload);
		},
		clearItem(state) {
			state.items = [];
		},
	},
});
// console.log(filter);
export const { addItem, delItem, clearItem } = cart.actions;

export default cart.reducer;
