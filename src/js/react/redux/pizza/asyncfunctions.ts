import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaBlock } from "./type";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaBlock[], Record<string, string>>(
	"pizzas/pizzasStatus",
	async ({
		url,
		categoryIndex,
		search,
		sortBy,
		sortDirection,
		paginationNumber,
	}) => {
		const { data } = await axios.get<PizzaBlock[]>(
			`${url}?${categoryIndex}&${sortBy}&order=${sortDirection}&
			page=${paginationNumber}&limit=5&${search}`
		);
		return data;
	}
);