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
	types: number[];
	sizes: number[];
	count: number;
	cartId:number;
};

export interface PizzasSLice {
	items: PizzaBlock[];
	status: string;
	// sizeindex: ,
}

export type SearchPizzaParams = {
	url: string;
	categoryIndex: string;
	search: string;
	sortBy: string;
	sortDirection: string;
	paginationNumber: string;
};