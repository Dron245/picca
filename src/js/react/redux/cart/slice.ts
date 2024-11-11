import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { pizzasDataLS } from "../../utils/pizzasDataLS";
import { CartItem, CartItemsSlice } from "./type";
import { calcPrice } from "../../utils/calcPrice";

const { items, prices } = pizzasDataLS();
const initialState: CartItemsSlice = {
	prices,
	items,
};

export const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			console.log(action.payload);
			const findItem = state.items
				// .filter(obj =>obj.id === action.payload.id)
				// .filter(obj=>obj.types===action.payload.types)
				// .find(obj=>obj.sizes===action.payload.sizes)
				.find(
					(obj) =>
						obj.id === action.payload.id &&
						obj.types === action.payload.types &&
						obj.sizes === action.payload.sizes
				);

			const findCountItem = state.items.find((obj) => obj.id === action.payload.id);

			if (!findItem) {
				state.items.push({
					...action.payload,
					count: 1,
					countPizzaBlock: 1,
					cartId: Math.random() * (10 - 1) + 1,
				});
				// console.log(action.payload);
				console.log("finditem нет");
				console.log(state.items);
			} else {
				// console.log('finditem:',`${findItem.title}`,`${findItem.id}`,`${findItem.types}`, `${findItem.sizes}`);
				console.log("finditem есть");
				findItem.count++;
			}

			if (findCountItem) {
				findCountItem.countPizzaBlock++;
			}
			state.prices = calcPrice(state.items);
			console.log(state.items);
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			findItem && findItem.count > 0 && findItem.count--;
			state.prices = calcPrice(state.items);
		},

		delItem(state, action: PayloadAction<number>) {
			state.items = state.items.filter((obj) => obj.cartId !== action.payload);
		},
		clearItem(state) {
			state.items = [];
			state.prices = 0;
		},
	},
});

export const { addItem, delItem, minusItem, clearItem } = cart.actions;

export default cart.reducer;
