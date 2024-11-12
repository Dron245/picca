import { CartItemProps } from "../CartItem";
import "./LastOrderItem.scss";

const LastOrderItem: React.FC<CartItemProps> = ({
	 imageUrl, title, types, sizes, price 
	}) => {
	return (
		<div className="last-order">
			<div className="last-order__wrapper">
				<div className="last-order__top">Вы заказали:</div>
				<div className="last-order__content">
					<div className="last-order__img">
						<img src={imageUrl} alt="Image" />
					</div>
					<div className="last-order__text">
						<div className="last-order__title">{title}</div>
						<div className="last-order__details">
							{types} {sizes} см.
						</div>
						<div className="last-order__details">цена: {price} ₽</div>
					</div>
				</div>
			</div>
			<div className="last-order__bottom"></div>
		</div>
	);
};

export default LastOrderItem;