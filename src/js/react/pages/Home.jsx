import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/PizzaBlock.jsx';
import Sceleton from '../components/Sceleton.jsx';
const Home = () => {
	const [load, setLoad] = useState(true);
	const [items, setitems] = useState([]);
	const [categoryIndex, setcategoryIndex] = useState(0);
	const [activeSort, setactiveSort] = useState({
		name: 'популярности',
		sortName: 'rating',
	});
	const [sortvisible, setsortvisible] = useState(false);
	const [qwe, setqwe] = useState(true)
	useEffect(() => {
		async function fethData() {
			try {
				setLoad(true);
				const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas'
				const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';
				const sort = activeSort.sortName.replace('-', '');
				const sortDirection = activeSort.sortName.includes('-') ? 'asc' : 'desc';
				const resp = await Axios.get(
					`${url}?${category}&sortBy=${sort}&order=${sortDirection}`
				);
				// console.log(resp.data);
				setitems(resp.data);
				setLoad(false);
			} catch (error) {
				console.log(error);
			}
		}

		fethData();
	}, [categoryIndex, activeSort]);
	function asd() {
		setqwe(sortvisible ? false : true)
	}
	console.log(sortvisible, qwe);
	return (
		<div onClick={()=>asd()} className='container'>
			<div className='content__top'>
				<Categories
					value={categoryIndex}
					changeCatehory={(index) => setcategoryIndex(index)}
				/>
				<Sort qwe={qwe} sortType={activeSort}
				 changeSort={(index) => setactiveSort(index)}
				 visible={sortvisible} changeVisible={setsortvisible} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{load ? (
					<>
						{[...Array(8)].map((_, i) => (
							<Sceleton key={i} />
						))}
					</>
				) : (
					items.map((pizza, index) => <PizzaBlock key={index} {...pizza} />)
				)}
			</div>
		</div>
	);
};

export default Home;
