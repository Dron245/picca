import React, { useContext, useEffect, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategoryId, paginationId, setFilters } from '../redux/slises/filter.js';
import { fetchPizzas } from '../redux/slises/pizzaSlice.js';
import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/PizzaBlock.jsx';
import Sceleton from '../components/Sceleton.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';
// import { SearchContext } from "../App.jsx";
import { list } from '../components/Sort.jsx';

const Home = () => {
	const { categoryId, paginationNumber, sortR } = useSelector((state) => state.filter);
	const { items, status, searhValue } = useSelector((state) => state.pizzas);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	// const { searchValue } = useContext(SearchContext);
	// const [load, setLoad] = useState(true);
	// console.log(items);
	const changeCategoryRedux = (index) => {
		dispatch(changeCategoryId(index));
	};
	function changePaginationPage(number) {
		dispatch(paginationId(number));
	}

	useEffect(() => {
		function getPizzas() {
			const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
			const categoryIndex = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searhValue ? `search=${searhValue}` : '';
			const sort = `sortBy=${sortR.sortProperty.replace('-', '')}`;
			const sortDirection = sortR.sortProperty.includes('-') ? 'asc' : 'desc';

			dispatch(
				fetchPizzas({ url, categoryIndex, search, sort, sortDirection, paginationNumber })
			);
		}
		getPizzas();
		if (!isSearch.current) {
			// async function fethData() {
			// 	try {
			// 		setLoad(true);
			// 		const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
			// 		const categoryIndex = categoryId > 0 ? `category=${categoryId}` : '';
			// 		const search = searchValue ? `search=${searchValue}` : '';
			// 		const sort = `sortBy=${sortR.sortProperty.replace('-', '')}`;
			// 		const sortDirection = sortR.sortProperty.includes('-') ? 'asc' : 'desc';
			// 		const {data} = await Axios.get(
			// 			`${url}?${categoryIndex}&${sort}&order=${sortDirection}&page=${paginationNumber}&limit=4&${search}`
			// 		);
			// 		dispatch(setpizzas(data))
			// 		setLoad(false);
			// 	} catch (error) {
			// 		console.log(error);
			// 	}
			// }
			// fethData();
		}

		isSearch.current = false;
	}, [categoryId, sortR.sortProperty, searhValue, paginationNumber]);

	// Если изменили параметры и был первый рендер, то
	// переводим зависимости useEffect в строку браузера
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortR.sortProperty,
				categoryId,
				paginationNumber,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortR.sortProperty, paginationNumber]);

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
			isSearch.current = true;
		}
	}, []);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} changeCategory={changeCategoryRedux} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка 😕</h2>
						<p>
							К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.
						</p>
					</div>
				) : status === 'load' ? (
					<>
						{[...Array(8)].map((_, i) => (
							<Sceleton key={i} />
						))}
					</>
				) : (
					items
						.filter((pizza) =>
							pizza.title.toLowerCase().includes(searhValue.toLowerCase())
						)
						.map((pizza, index) => <PizzaBlock key={index} {...pizza} />)
				)}

				{/* {load ? (
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
				)} */}
			</div>
			<Pagination onChangePage={changePaginationPage} />
		</div>
	);
};

export default Home;
