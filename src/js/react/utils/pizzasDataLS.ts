import { CartItem } from '../redux/cart/type';
import { calcPrice } from './calcPrice';
// import { PizzaBlock } from "../redux/slises/pizzaSlice";

export const pizzasDataLS = () => {
	const json = localStorage.getItem('Cart');
	const items: CartItem[] = JSON.parse(json as string) || [];

	const data = {
		prices: calcPrice(items),
		items: items,
	};
	return data;
};
