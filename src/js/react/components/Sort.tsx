import React, { useEffect, useRef, useState } from 'react';
import { selectorFilter, sortId } from '../redux/slises/filter.js';
import { useSelector, useDispatch } from 'react-redux';

type SortItem = {
	name: string;
	sortProperty: string;
};

export const list: SortItem[] = [
	{ name: 'популярности', sortProperty: 'rating' },
	{ name: 'популярности (сначала мин)', sortProperty: '-rating' },
	{ name: 'цене', sortProperty: 'price' },
	{ name: 'цене (сначала мин)', sortProperty: '-price' },
	{ name: 'алфавиту', sortProperty: '-name' },
];

const Sort: React.FC = () => {
	const [sortvisible, setSortvisible] = useState(false);
	const sortRedux = useSelector(selectorFilter);
	const dispatch = useDispatch();
	const sortMenu = useRef<HTMLDivElement>(null);

	const isActivesort = (obj: SortItem) => {
		dispatch(sortId(obj));
		setSortvisible(false);
	};

	const closeSortMenu = (event: MouseEvent) => {
		if (sortMenu.current && !event.composedPath().includes(sortMenu.current)) {
			setSortvisible(false);
		}
	};
	useEffect(() => {
		document.addEventListener('click', closeSortMenu);

		return () => {
			document.removeEventListener('click', closeSortMenu);
		};
	}, []);
	return (
		<div ref={sortMenu} className='sort'>
			<div onClick={() => setSortvisible(!sortvisible)} className='sort__label'>
				<svg
					className={sortvisible ? '_view' : ''}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span>{sortRedux.sortR.name}</span>
			</div>
			<div className='sort__popup'>
				{sortvisible && (
					<ul>
						{list.map((item, index) => (
							<li
								onClick={() => isActivesort(item)}
								key={index}
								className={sortRedux.sortR.name === item.name ? 'active' : ''}
							>
								{item.name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Sort;
