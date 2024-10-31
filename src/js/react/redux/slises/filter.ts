import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum sortPropertyEnum{
	RATING = 'rating',
	RATINGASC = '-rating',
	PRICE = 'price',
	PRICEASC = '-price',
	NAME = '-name'
}

export type SortType = {
	name: string ;
	sortProperty: sortPropertyEnum 
}

export interface FilterSlice {
	searhValue: string;
	categoryId: number,
	sort: SortType,
	paginationNumber: number,

	// sortProperty: sortPropertyEnum;
}

const initialState: FilterSlice  = {
	searhValue: '',
	categoryId: 0,
	paginationNumber: 1,
	sort: {
		name: "популярности",
		sortProperty: sortPropertyEnum.RATING,
	},

	// sortProperty: sortPropertyEnum.RATING,
};

export const filter = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searhValue = action.payload;
			// console.log(action.payload);
		},
		changeCategoryId(state, action:PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		sortId(state, action:PayloadAction<SortType>) {
			state.sort = action.payload;
		},
		paginationId(state, action:PayloadAction<number>) {
			state.paginationNumber = action.payload;
		},
		setFilters(state, action:PayloadAction<FilterSlice>) {
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
			state.paginationNumber = Number(action.payload.paginationNumber);
			console.log(action.payload);
			
		}
	},
});

export const selectorFilter = (state:RootState)=>state.filter
export const { setSearchValue, changeCategoryId, sortId, paginationId, setFilters } = filter.actions;

export default filter.reducer;
