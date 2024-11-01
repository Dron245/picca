export type CartItem = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: string;
	sizes: number;
	count: number;
};

export interface CartItemsSlice {
	prices: number;
	items: CartItem[];
}