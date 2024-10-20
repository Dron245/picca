import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sort: {
		name: "popular",
		sortProperty: "rating",
	},
	paginationNumber: 1,
};

export const filter = createSlice({
	name: "filter",
	initialState,
	reducers: {
		categoryId(state, action) {
			state.categoryId = action.payload;
			console.log(action.payload);
		},
		sortId(state, action) {
			state.sort = action.payload;
			console.log(action.payload);
		},
		paginationId(state, action) {
			state.paginationNumber = action.payload;
		},
		setFilters(state, action) {
			state.categoryId = Number(action.payload.categoryR);
			state.sort = action.payload.sort;
			state.paginationNumber = Number(action.payload.paginationR);
			console.log(action.payload);
		}
	},
});
// console.log(filter);
export const { categoryId, sortId, paginationId, setFilters } = filter.actions;

export default filter.reducer;
