import React, { useContext, useEffect, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { categoryId, paginationId, setFilters } from '../redux/slises/filter.js';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/PizzaBlock.jsx';
import Sceleton from '../components/Sceleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
import { SearchContext } from '../App.jsx';
import { list } from '../components/Sort.jsx';
const Home = () => {
	const categoryR = useSelector((state) => state.filter.categoryId);
	const sortR = useSelector((state) => state.filter.sort);
	const paginationR = useSelector((state) => state.filter.paginationNumber);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { searchValue } = useContext(SearchContext);
	const [load, setLoad] = useState(true);
	const [items, setitems] = useState([]);

	const changeCategoryRedux = (index) => {
		dispatch(categoryId(index));
	};
	function changePaginationPage(number) {
		dispatch(paginationId(number));
	}
	useEffect(() => {
		async function fethData() {
			try {
				setLoad(true);
				const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
				const categoryIndex = categoryR > 0 ? `category=${categoryR}` : '';
				const search = searchValue ? `search=${searchValue}` : '';
				const sort = `sortBy=${sortR.sortProperty.replace('-', '')}`;
				const sortDirection = sortR.sortProperty.includes('-') ? 'asc' : 'desc';
				const resp = await Axios.get(
					`${url}?${categoryIndex}&${sort}&order=${sortDirection}&page=${paginationR}&limit=4&${search}`
				);
				setitems(resp.data);
				setLoad(false);
			} catch (error) {
				console.log(error);
			}
		}

		fethData();
	}, [categoryR, sortR.sortProperty, searchValue, paginationR]);

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		// if (isMounted.current) {

		const queryString = qs.stringify({
			sortProperty: sortR.sortProperty,
			categoryR,
			paginationR,
		});
		// console.log(queryString, typeof(queryString));
		navigate(`?${queryString}`);
		// }
		// isMounted.current = true;
	}, [categoryR, sortR.sortProperty, paginationR]);

	// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			console.log(params, sort);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			//   isSearch.current = true;
		}
	}, []);
	console.log(sortR);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryR} changeCategory={changeCategoryRedux} />
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
			<Pagination onChangePage={changePaginationPage} />
		</div>
	);
};

export default Home;
