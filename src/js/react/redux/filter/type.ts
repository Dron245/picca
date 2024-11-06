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
	sortProperty: sortPropertyEnum.RATING,
}