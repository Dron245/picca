// @ts-nocheck

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
		imageUrl: string;
		title: string;
		price: number;
		id: string;
	}>();
	
	const findItems = items.find(obj=>obj.id===id)
	// console.log(findItems);
	const [sizeindex, setsizeindex] = useState(0);
	const [typePizza, settypePizza] =
	findItems && findItems.types.length === 1 && findItems.types[0] === 1 ? useState(1) : useState(0);
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

		const addPizza=()=> {
			const findItemsCorrect = {...findItems,
				types: typeNames[typePizza],
			sizes: findItems && findItems.sizes[sizeindex],
			count,
			}
			console.log(findItemsCorrect);
			
		dispatch(addItem(findItemsCorrect))
	}
	
	return (
		<div className='container'>
			{pizza  ? (
				<>
					<img src={findItems && findItems.imageUrl} />
					<p>{findItems && findItems.title}</p>
					<p>{findItems && findItems.price} рублей</p>
					<div className='pizza-block__selector'>
					<ul>
						{findItems && findItems.types.map((type) => (
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
						{findItems && findItems.sizes.map((size, index) => (
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
				
					<button onClick={addPizza} className='button button--outline button--add'>купить
					{count > 0 &&<i>{count}</i>}</button>
					<Link to='/' className='button button--outline button--add go-back-btn'>
						<span>Вернуться назад</span>
					</Link>
				</>
			) : (
				'Загрузка...'
			)}
		</div>
	);
};

export default FullPizza;
