export type CartItem = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: string;
	sizes: number;
	count: number;
	countPizzaBlock: number;
	cartId: number
};

export interface CartItemsSlice {
	prices: number;
	items: CartItem[];
	allitems: CartItem[]
}