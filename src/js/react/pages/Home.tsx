import React, { useEffect } from 'react';
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
	FilterSlice,
	changeCategoryId,
	paginationId,
	setFilters,
} from '../redux/slises/filter';
import {
	SearchPizzaParams,
	fetchPizzas,
	selectorPizzasData,
} from '../redux/slises/pizzaSlice';
import { selectorFilter } from '../redux/slises/filter';
import { useAppDispatch } from '../redux/store';

const Home = () => {
	const { categoryId, paginationNumber, sort } = useSelector(selectorFilter);
	const { items, status } = useSelector(selectorPizzasData);
	const { searhValue } = useSelector(selectorFilter);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
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
			) as unknown as /*SearchPizzaParams*/ FilterSlice;

			// const sort = list.find((obj) => obj.sortProperty === params.sortBy);
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			if (sort) {
				params.sort = sort;
			}
			console.log(params);

			dispatch(
				setFilters(
				// 	{
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
						.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
				)}
			</div>
			<Pagination onChangePage={changePaginationPage} />
		</div>
	);
};

export default Home;
