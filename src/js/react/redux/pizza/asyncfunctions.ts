import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaBlock, SearchPizzaParams } from "./type";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
	'pizzas/pizzasStatus',
	async (params: SearchPizzaParams) => {
		const { url, categoryIndex, search, sortBy, sortDirection, paginationNumber } =
			params;
		const { data } = await axios.get(
			`${url}?${categoryIndex}&${sortBy}&order=${sortDirection}&
			page=${paginationNumber}&limit=5&${search}`
		);
		return data as PizzaBlock[];
	}
);