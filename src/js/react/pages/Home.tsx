import React, { useCallback, useEffect } from 'react';
import { useWhyDidYouUpdate } from 'ahooks';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Categories, Sort, PizzaBlock, Sceleton, Pagination, list } from '../components';

import { useAppDispatch } from '../redux/store';
import { changeCategoryId, paginationId, setFilters } from '../redux/filter/slice';
import { selectorFilter } from '../redux/filter/selectors';
import { selectorPizzasData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncfunctions';
import { SearchPizzaParams } from '../redux/pizza/type';
import { FilterSlice, sortPropertyEnum } from '../redux/filter/type';
import { clearItem } from '../redux/cart/slice';

const Home = () => {
	useWhyDidYouUpdate('Home', {});
	const { categoryId, paginationNumber, sort, searhValue } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzasData);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	// console.log(items);

	const changeCategory = useCallback((index: number) => {
		dispatch(changeCategoryId(index));
	}, []);
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

	function clearCart() {
		dispatch(clearItem());
	}
	useEffect(() => {
		getPizzas();
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searhValue, paginationNumber]);

	// Если изменили параметры и был первый рендер, то
	// переводим зависимости useEffect в строку браузера
	useEffect(() => {
		if (isMounted.current) {
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
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as FilterSlice;
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
		if (!window.location.search) {
			dispatch(
				setFilters({
					categoryId: Number(0),
					paginationNumber: 1,
					searhValue: '',
					sort: {
						name: 'популярности',
						sortProperty: sortPropertyEnum.RATING,
					},
					sortProperty: sortPropertyEnum.RATING,
				})
			);
		}
	}, [window.location.search]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} changeCategory={changeCategory} />
				<Sort value={sort} />
			</div>
			<div className='content__center'>
				<h2 className='content__title'>Все пиццы</h2>
				<div onClick={clearCart} className='cart__clear'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M2.5 5H4.16667H17.5'
							stroke='#B6B6B6'
							strokeWidth='1.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
						<path
							d='M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z'
							stroke='#B6B6B6'
							strokeWidth='1.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
						<path
							d='M8.33337 9.16667V14.1667'
							stroke='#B6B6B6'
							strokeWidth='1.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
						<path
							d='M11.6666 9.16667V14.1667'
							stroke='#B6B6B6'
							strokeWidth='1.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						></path>
					</svg>
					<span>Очистить корзину</span>
				</div>
			</div>

			<div className='content__items'>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Нет такой пиццы 😕</h2>
						<p>К сожалению, не удалось получить пиццы.</p>
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
