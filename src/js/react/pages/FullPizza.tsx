import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../redux/cart/type';
import { addItem } from '../redux/cart/slice';
import { PizzaBlock } from '../redux/pizza/type';
import { selectorPizzasData } from '../redux/pizza/selectors';
import { PizzaBlockProps, typeNames } from '../components/PizzaBlock';
import { cartSelectorfindById } from '../redux/cart/selectors';
const FullPizza: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const { items } = useSelector(selectorPizzasData);
	const [pizza, setPizza] = useState<{
		id: string;
		title: string;
		imageUrl: string;
		price: number;
		types: number[];
		sizes: number[];
		count: number;
	}>({
		id: '',
		title: '',
		imageUrl: '',
		price: 0,
		types: [],
		sizes: [],
		count: 0,
	});

	const [sizeindex, setsizeindex] = useState(0);
	const [typePizza, settypePizza] =
		pizza.types.length === 1 && pizza.types[0] === 1 ? useState(1) : useState(0);
	const pizzaR = useSelector(cartSelectorfindById(id as string));
	const count = pizzaR ? pizzaR.count : 0;
	try {
		useEffect(() => {
			const fethdata = async () => {
				const { data } = await Axios.get(
					'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas/' + `${id}`
				);
				setPizza(data);
			};
			fethdata();
		}, []);
	} catch (error) {
		alert('ошибка в получении пицц');
		console.log(error);
		navigate('/');
	}

	const addPizza = () => {
		const pizzaCorrect = {
			...pizza,
			types: typeNames[typePizza],
			sizes: pizza.sizes[sizeindex],
			count,
		};
		dispatch(addItem(pizzaCorrect));
	};

	return (
		<div className='container fullpizza'>
			{pizza ? (
				<>
					<img className='fullpizza__img' src={pizza.imageUrl} />
					<div className="fullpizza__content">
					<p className='pizza-block__title'>{pizza.title}</p>
					<p className='pizza-block__price'>{pizza.price} рублей</p>
					<div className='pizza-block__selector'>
						<ul>
							{pizza.types.map((type) => (
								<li
									onClick={() => settypePizza(type)}
									key={type}
									className={typePizza === type ? 'active' : ''}
								>
									{typeNames[type]}
								</li>
							))}
						</ul>
						<ul>
							{pizza.sizes.map((size, index) => (
								<li
									key={index}
									onClick={() => setsizeindex(index)}
									className={sizeindex === index ? 'active' : ''}
								>
									{size}
								</li>
							))}
						</ul>
					</div>

					<button style={{marginRight:'20px'}} onClick={addPizza} className='button button--outline button--add'>
						<span>купить</span>
						{count > 0 && <i>{count}</i>}
					</button>
					<Link to='/' className='button button--outline button--add go-back-btn'>
						<span>Вернуться назад</span>
					</Link>
					</div>
					
				</>
			) : (
				'Загрузка...'
			)}
		</div>
	);
};

export default FullPizza;
