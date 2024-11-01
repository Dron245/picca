import { CartItem } from "../redux/cart/type";

export const calcPrice = (items: CartItem[]) => (
	items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
);
