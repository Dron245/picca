import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {categoryId} from '../redux/slises/filter.js';
import Axios from 'axios';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/PizzaBlock.jsx';
import Sceleton from '../components/Sceleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import { SearchContext } from '../App.jsx';

const Home = () => {
	const categoryR = useSelector((state)=> state.filter.value);
	const sortR = useSelector((state)=> state.filter.sort);
	// console.log(category);
	console.log(sortR);
	
	const dispatch = useDispatch();
	const { searchValue } = useContext(SearchContext);
	const [load, setLoad] = useState(true);
	const [items, setitems] = useState([]);

	const changeCatehoryRedux =(i)=> {
		dispatch(categoryId(i))
	}
	
	const [changeCurrentPage, setChangeCurrentPage] = useState(1);
	useEffect(() => {
		async function fethData() {
			try {
				setLoad(true);
				const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
				const categoryIndex = categoryR > 0 ? `category=${categoryR}` : '';
				const search = searchValue ? `search=${searchValue}` : '';
				const sort = sortR.sortName.replace('-', '');
				const sortDirection = sortR.sortName.includes('-') ? 'asc' : 'desc';
				const resp = await Axios.get(
					`${url}?${categoryIndex}&${search}&sortBy=${sort}&order=${sortDirection}&page=${changeCurrentPage}&limit=4`
				);
				setitems(resp.data);
				setLoad(false);
			} catch (error) {
				console.log(error);
			}
		}

		fethData();
	}, [categoryR, sortR, searchValue, changeCurrentPage]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryR}
					changeCatehory={changeCatehoryRedux}
				/>
				<Sort />
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
					items
						.filter((pizza) =>
							pizza.title.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((pizza, index) => <PizzaBlock key={index} {...pizza} />)
				)}
			</div>
			<Pagination onChangePage={(number) => setChangeCurrentPage(number)} />
		</div>
	);
};

export default Home;
