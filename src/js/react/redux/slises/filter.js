import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
	sort: {
		name: "popular",
		sortName: "rating",
	},
	paginationNumber: 1,
};

export const filter = createSlice({
	name: "filter",
	initialState,
	reducers: {
		categoryId(state, action) {
			state.value = action.payload;
		},
		sortId(state, action) {
			state.sort = action.payload;
		},
		paginationId(state, action) {
			state.paginationNumber = action.payload;
		},
	},
});

export const { categoryId, sortId, paginationId } = filter.actions;

export default filter.reducer;
