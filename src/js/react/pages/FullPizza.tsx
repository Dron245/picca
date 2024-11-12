import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/cart/slice";
import { typeNames } from "../components/PizzaBlock";
import { cartSelector, cartSelectorfindById } from "../redux/cart/selectors";
const FullPizza: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { idPizza } = useParams();
	const [pizza, setPizza] = useState<{
		id: string;
		title: string;
		imageUrl: string;
		price: number[];
		types: number[];
		sizes: number[];
		count: number;
		countPizzaBlock: number;
		cartId: number;
	}>({
		id: "",
		title: "",
		imageUrl: "",
		price: [],
		types: [],
		sizes: [],
		count: 0,
		countPizzaBlock: 0,
		cartId: 555,
	});
	const { items } = useSelector(cartSelector);
	const [sizeindex, setSizeindex] = useState(0);
	const [typeIndex, setTypeIndex] =
		pizza.types.length === 1 && pizza.types[0] === 1 ? useState(1) : useState(0);
	const pizzaR = useSelector(cartSelectorfindById(idPizza as string));

	const findItem = items.find(
		(obj) =>
			obj.title === pizza.title &&
			obj.types === typeNames[typeIndex] &&
			obj.sizes === pizza.sizes[sizeindex]
	);
	const count = findItem ? findItem.count : 0;
	const countPizzaBlock = pizzaR ? pizzaR.countPizzaBlock : 0;
	console.log(count, findItem);

	try {
		useEffect(() => {
			const fethdata = async () => {
				const { data } = await Axios.get(
					"https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas/" + `${idPizza}`
				);
				setPizza(data);
			};
			fethdata();
		}, []);
	} catch (error) {
		alert("ошибка в получении пицц");
		console.log(error);
		navigate("/");
	}

	const addPizza = () => {
		const pizzaCorrect = {
			...pizza,
			price: pizza.price[sizeindex],
			types: typeNames[typeIndex],
			sizes: pizza.sizes[sizeindex],
		};
		dispatch(addItem(pizzaCorrect));
	};

	return (
		<div className="container fullpizza">
			{pizza ? (
				<>
					<img className="fullpizza__img" src={pizza.imageUrl} />
					<div className="fullpizza__content">
						<p className="pizza-block__title">{pizza.title}</p>
						<p className="pizza-block__price">{pizza.price[sizeindex]} рублей</p>
						<div className="pizza-block__selector">
							<ul>
								{pizza.types.map((type) => (
									<li
										onClick={() => setTypeIndex(type)}
										key={type}
										className={typeIndex === type ? "active" : ""}>
										{typeNames[type]}
									</li>
								))}
							</ul>
							<ul>
								{pizza.sizes.map((size, index) => (
									<li
										key={index}
										onClick={() => setSizeindex(index)}
										className={sizeindex === index ? "active" : ""}>
										{size} см.
									</li>
								))}
							</ul>
						</div>
						<button
							style={{ marginRight: "20px" }}
							onClick={addPizza}
							className="button button--outline button--add">
							<span>купить</span>
							{/* {countPizzaBlock > 0 && <i>{countPizzaBlock}</i>} */}
						</button>
						<Link to="/" className="button button--outline button--add go-back-btn">
							<span>Вернуться назад</span>
						</Link>

						<div className="pizza-block__info">
							<span className="pizza-block__title">
								Всего куплено пицц {pizza.title}: {countPizzaBlock}
							</span>
							<span className="pizza-block__price">
								Куплено пицц "{pizza.title}" тесто: {typeNames[typeIndex]} размер "
								{pizza.sizes[sizeindex]} см" : {count} шт.
							</span>
						</div>
					</div>
				</>
			) : (
				"Загрузка..."
			)}
		</div>
	);
};

export default FullPizza;
