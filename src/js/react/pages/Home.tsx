import React, { useCallback, useEffect } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Categories, Sort, PizzaBlock, Sceleton, Pagination, list} from '../components';

import { useAppDispatch } from '../redux/store';
import { changeCategoryId, paginationId, setFilters } from '../redux/filter/slice';
import { selectorFilter } from '../redux/filter/selectors';
import { selectorPizzasData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncfunctions';
import { SearchPizzaParams } from '../redux/pizza/type';
import { FilterSlice, sortPropertyEnum } from '../redux/filter/type';

const Home = () => {
	useWhyDidYouUpdate('Home', {})
	const { categoryId, paginationNumber, sort, searhValue } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzasData);
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
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searhValue, paginationNumber]);

	// Если изменили параметры и был первый рендер, то
	// переводим зависимости useEffect в строку браузера
	useEffect(() => {
		if (isMounted.current ) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				paginationNumber,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, paginationNumber]);
	
	// Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search ) {
			
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as FilterSlice ;
			// const params = qs.parse(
			// 	window.location.search.substring(1)
			// ) as unknown as SearchPizzaParams;
			console.log(params);
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			// const sort = list.find((obj) => obj.sortProperty === params.sortBy);
			if (sort) {
				params.sort = sort;
			}

			dispatch(
				setFilters(
					// {
					// 	categoryId: Number(params.categoryIndex),
					// 	paginationNumber: Number(params.paginationNumber),
					// 	sort: sort ? sort : list[0],
					// 	searhValue: params.search,
					// }
					params
				)
			);

			isSearch.current = true;
		} 
	}, []);
	// console.log(window.location.search);

	useEffect(() => {
	  if(!window.location.search) {
		dispatch(setFilters(
			{
				categoryId:Number(0),
				paginationNumber: 1,
				searhValue: '',
				sort: {
					name: "популярности",
					sortProperty: sortPropertyEnum.RATING,
				},
				sortProperty: sortPropertyEnum.RATING,
			}
		))
	  }
	  
	}, [window.location.search])
	
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
						<h2>Нет такой пиццы 😕</h2>
						<p>
							К сожалению, не удалось получить пиццы.
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
