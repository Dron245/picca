import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pizzasDataLS } from "../../utils/pizzasDataLS";
import { CartItem, CartItemsSlice } from "./type";
import { calcPrice } from "../../utils/calcPrice";

const { items, prices } = pizzasDataLS();
const initialState: CartItemsSlice = {
	prices,
	items,
	allitems: [],
};

export const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			// console.log(action.payload);

			state.allitems.push(action.payload);
			const findItem = state.items.find(
				(obj) =>
					obj.id === action.payload.id &&
					obj.types === action.payload.types &&
					obj.sizes === action.payload.sizes
			);

			const findCountItem = state.items
			.find((obj) => obj.id === action.payload.id);

			if (!findItem) {
				state.items.push({
					...action.payload,
					count: 1,
					countPizzaBlock: 1,
					cartId: Math.random() * (10 - 1) + 1,
				});
				// console.log("finditem нет");
			} else {
				// console.log("finditem есть");
				findItem.count++;
			}

			if (findCountItem) {
				findCountItem.countPizzaBlock++;
			}
			state.prices = calcPrice(state.items);
			// console.log(state.items);
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			findItem && findItem.count > 0 && findItem.count--;
			state.prices = calcPrice(state.items);
		},

		delItem(state, action: PayloadAction<number>) {
			state.items = state.items
			.filter((obj) => obj.cartId !== action.payload);
			state.prices = calcPrice(state.items);
		},
		clearItem(state) {
			state.items = [];
			state.prices = 0;
		},
	},
});

export const { addItem, delItem, minusItem, clearItem } = cart.actions;

export default cart.reducer;
