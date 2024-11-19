// import { SortType } from "../filter/type";

export enum CartStatusEnum {
	LOAD = 'load',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type PizzaBlock = {
	id: string;
	title: string;
	imageUrl: string;
	price: number[];
	rating: number;
	types: number[];
	sizes: number[];
	count: number;
	cartId:number;
};

export interface PizzasSLice {
	items: PizzaBlock[];
	status: string;
}

export type SearchPizzaParams = {
	url: string;
	categoryIndex: string;
	search: string;
	sortBy: string;
	sortDirection: string;
	paginationNumber: string;
	// sort: SortType
};