import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CartItem } from '../redux/cart/type';
import { addItem } from '../redux/cart/slice';
const FullPizza: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
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


	// const addPizza=()=> {
	// 	dispatch(addItem({
			
	// 	}))
	// }

	return (
		<div className='container'>
			{pizza ? (
				<>
					<img src={pizza.imageUrl} />
					<p>{pizza.title}</p>
					<p>{pizza.price} рублей</p>
					{/* <button onClick={addPizza} className='button button--outline button--add'>купить</button> */}
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
