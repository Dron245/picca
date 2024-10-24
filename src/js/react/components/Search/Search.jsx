import React, { useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import './Search.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectorPizzasData, setSearchValueR } from '../../redux/slises/pizzaSlice';
const Search = () => {
	const dispatch = useDispatch();
	const {searhValue} = useSelector(selectorPizzasData);
	const inputRef = useRef();
	const [value, setValue] = React.useState('');
	const searhValueFunction = () => {
		dispatch(setSearchValueR(''));
		setValue('');
		inputRef.current.focus();
	};

	const searchResp = useCallback(
		debounce((str) => {
			dispatch(setSearchValueR(str));
		}, 200),
		[]
	);

	const changeSearch = (e) => {
		setValue(e.target.value)
		searchResp(e.target.value);
	};
	return (
		<div className='input-search'>
			<input
				ref={inputRef}
				value={value}
				name='search'
				onChange={(e) => changeSearch(e)}
				placeholder='Поиск пиццы...'
				type='text'
				className='input-search__input'
			/>
			{searhValue && (
				<img
					onClick={searhValueFunction}
					className='input-search__icon'
					src='img/close-svgrepo-com.svg'
					alt='Image'
				/>
			)}
		</div>
	);
};

export default Search;
