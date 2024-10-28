import React, { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/Sceleton';
import Pagination from '../components/Pagination/Pagination';
import { list } from '../components/Sort';
import { changeCategoryId, paginationId, setFilters } from '../redux/slises/filter.js';
import { fetchPizzas, selectorPizzasData } from '../redux/slises/pizzaSlice.js';
import { selectorFilter } from '../redux/slises/filter.js';

const Home = () => {
	const { categoryId, paginationNumber, sortR } = useSelector(selectorFilter);
	const { items, status, searhValue } = useSelector(selectorPizzasData);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	// console.log(items);
	const changeCategoryRedux = (index: number) => {
		dispatch(changeCategoryId(index));
	};
	const changePaginationPage = (number: number) => {
		dispatch(paginationId(number));
	};

	useEffect(() => {
		function getPizzas() {
			const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
			const categoryIndex = categoryId > 0 ? `category=${categoryId}` : '';
			const search = searhValue ? `search=${searhValue}` : '';
			const sort = `sortBy=${sortR.sortProperty.replace('-', '')}`;
			const sortDirection = sortR.sortProperty.includes('-') ? 'asc' : 'desc';

			dispatch(
				// @ts-ignore
				fetchPizzas({ url, categoryIndex, search, sort, sortDirection, paginationNumber })
			);
		}
		getPizzas();

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
						.filter((pizza: any) =>
							pizza.title.toLowerCase().includes(searhValue.toLowerCase())
						)
						.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />)
				)}
			</div>
			<Pagination onChangePage={changePaginationPage} />
		</div>
	);
};

export default Home;
