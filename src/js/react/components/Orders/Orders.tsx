import React from "react";
import LastOrderItem from "../LastOrderItem/LastOrderItem";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/cart/selectors";
import "./Orders.scss";

const Orders: React.FC = () => {
	const { allitems } = useSelector(cartSelector);

	return (
		<div className="Orders">
			{allitems.map((item, index) => (
				<LastOrderItem key={index} {...item} />
			))}
		</div>
	);
};

export default Orders;
