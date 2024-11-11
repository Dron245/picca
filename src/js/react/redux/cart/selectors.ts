
import { RootState } from "../store";

export const cartSelectorfindById = (id: string) => (state: RootState) =>
	state.cart.items.find((obj) => obj.id === id);

export const cartSelectorDelId = (cartId: number) => (state: RootState) =>
	state.cart.items.find((obj) => obj.cartId === cartId);

export const cartSelector = (state: RootState) => state.cart;
