import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pizzasDataLS } from "../../utils/pizzasDataLS";
import { CartItem, CartItemsSlice } from "./type";
import { calcPrice } from "../../utils/calcPrice";

const {items, prices} = pizzasDataLS()
const initialState: CartItemsSlice = {
	prices,
	items,
};

export const cart = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (!findItem) {
				state.items.push({ ...action.payload, count: 1 });
				console.log(action.payload);
				
			} else {
				findItem.count++;
			}
			state.prices = calcPrice(state.items);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			findItem && findItem.count > 0 && findItem.count--;
			state.prices = calcPrice(state.items);
		},

		delItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
			state.prices = 0
		},
	},
});
export const { addItem, delItem, minusItem, clearItem } = cart.actions;

export default cart.reducer;