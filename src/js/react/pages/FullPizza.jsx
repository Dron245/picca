import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const FullPizza = () => {
	const {id} = useParams();
	const [pizza, setPizza] = useState();
	console.log(id);
	try {
		useEffect(() => {
			const fethdata = async () => {
				const { data } = await Axios.get(
					'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas/' + `${id}`
					 
				);
				setPizza(data)
			};
			fethdata()
		}, []);
	} catch (error) {
		alert('ошибка в получении пицц')
		console.log(error);
	}
	
	return <div className='container'>
		{
			pizza ? (
				<>
				<img src={pizza.imageUrl}/>
				<p>{pizza.title}</p>
				<p>{pizza.price} рублей</p>
				</>
			) : "Загрузка..."
		}
	</div>;
};

export default FullPizza;
