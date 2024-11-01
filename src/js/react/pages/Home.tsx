import React, { useCallback, useEffect } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/Sceleton';
import Pagination from '../components/Pagination/Pagination';
import { list } from '../components/Sort';

import {
	SearchPizzaParams,
	fetchPizzas,
	selectorPizzasData,
} from '../redux/slises/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { selectorFilter } from '../redux/pizza/selectors';
import { changeCategoryId, paginationId, setFilters } from '../redux/filter/slice';
const a: number=4

const Home = () => {
	useWhyDidYouUpdate('Home', {})
	const { categoryId, paginationNumber, sort } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzasData);
	const { searhValue } = useSelector(selectorFilter);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	// console.log(items);
		
	const changeCategory = useCallback((index: number) => {
			dispatch(changeCategoryId(index));
	}, [])
	const changePaginationPage = (number: number) => {
		dispatch(paginationId(number));
	};

	function getPizzas() {
		const url = 'https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas';
		const categoryIndex = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searhValue ? `search=${searhValue}` : '';
		const sortBy = `sortBy=${sort.sortProperty.replace('-', '')}`;
		const sortDirection = sort.sortProperty.includes('-') ? 'asc' : 'desc';

		dispatch(
			fetchPizzas({
				url,
				categoryIndex,
				search,
				sortBy,
				sortDirection,
				paginationNumber: String(paginationNumber),
			})
		);
	}

	useEffect(() => {
		getPizzas();
		// isSearch.current = false;
	}, [categoryId, sort.sortProperty, searhValue, paginationNumber]);

	// Если изменили параметры и был первый рендер, то
	// переводим зависимости useEffect в строку браузера
	useEffect(() => {
		if (isMounted.current && a===3) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				paginationNumber,
			});
			navigate(`?${queryString}`);
		}
		// isMounted.current = true;
	}, [categoryId, sort.sortProperty, paginationNumber]);

	// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search && a===3) {
			// const params = qs.parse(
			// 	window.location.search.substring(1)
			// ) as unknown as FilterSlice ;
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams;
			// const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			const sort = list.find((obj) => obj.sortProperty === params.sortBy);
			// if (sort) {
			// 	params.sort = sort;
			// }
			console.log(params);

			dispatch(
				setFilters(
					{
						categoryId: Number(params.categoryIndex),
						paginationNumber: Number(params.paginationNumber),
						sort: sort ? sort : list[0],
						searhValue: params.search,
					}
					// params
				)
			);

			// isSearch.current = true;
		}
	}, []);
	// console.log(window.location.search);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} changeCategory={changeCategory} />
				<Sort value={sort} />
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
						.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
				)}
			</div>
			<Pagination onChangePage={changePaginationPage} />
		</div>
	);
};

export default Home;
