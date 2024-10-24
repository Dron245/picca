import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	prices: 0,
	items: [],
};

export const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (!findItem) {
				state.items.push({ ...action.payload, count: 1 });
				state.prices = state.items.reduce((sum, obj) => sum + obj.price, 0);
			} else {
				findItem.count++;
			}
		},

		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			findItem.count > 0 && findItem.count--;
		},

		delItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
		},
	},
});
// console.log(filter);
export const cartSelector = (state) => state.cart;
export const cartSelectorfindBuId = (id)=> (state) => state.cart.items
.find((obj) => obj.id === id);
export const { addItem, delItem, minusItem, clearItem } = cart.actions;

export default cart.reducer;
