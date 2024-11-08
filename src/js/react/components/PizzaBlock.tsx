import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { addItem } from '../redux/cart/slice';
import { cartSelectorfindById } from '../redux/cart/selectors';

export type PizzaBlockProps = {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
	count: number;
};
export const typeNames = ['тонкое', 'традиционное'];
export const PizzaBlock: React.FC<PizzaBlockProps> = ({
	id,
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const [sizeindex, setsizeindex] = useState(0);
	const [typePizza, settypePizza] =
		types.length === 1 && types[0] === 1 ? useState(1) : useState(0);
		const dispatch = useDispatch();
	const pizzaR = useSelector(cartSelectorfindById(id));
	const count = pizzaR ? pizzaR.count : 0;
	
	function addPizza() {
		const pizza = {
			id,
			title,
			imageUrl,
			price,
			types: typeNames[typePizza],
			sizes: sizes[sizeindex],
			count,
		};
		dispatch(addItem(pizza));
	}

	return (
		<div className='pizza-block-wrapper'>
			<div className='pizza-block'>
				<Link to={`/pizza/${id}`}>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((type) => (
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
						{sizes.map((size, index) => (
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
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<button className='button button--outline button--add'>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span onClick={addPizza}>Добавить</span>
						{ count > 0 && <i>{count}</i>}
					</button>
				</div>
			</div>
		</div>
	);
};