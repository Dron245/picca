import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartStatusEnum, PizzaBlock, PizzasSLice } from "./type";
import { fetchPizzas } from "./asyncfunctions";

const initialState: PizzasSLice = {
	items: [],
	status: CartStatusEnum.LOAD,
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
			// alert('ошибка в получении пицц');
			state.items = [];
		});
	},
});

export const { setpizzas } = pizzas.actions;
export default pizzas.reducer;