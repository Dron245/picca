import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sortR: {
		name: "популярности",
		sortProperty: "rating",
	},
	paginationNumber: 1,
};

export const filter = createSlice({
	name: "filter",
	initialState,
	reducers: {
		changeCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		sortId(state, action) {
			state.sortR = action.payload;
		},
		paginationId(state, action) {
			state.paginationNumber = action.payload;
		},
		setFilters(state, action) {
			state.categoryId = Number(action.payload.categoryId);
			state.sortR = action.payload.sort;
			state.paginationNumber = Number(action.payload.paginationNumber);
		}
	},
});

export const selectorFilter = state=>state.filter
export const { changeCategoryId, sortId, paginationId, setFilters } = filter.actions;

export default filter.reducer;
