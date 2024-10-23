import React, { useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import './Search.scss';
// import { SearchContext } from '../../App.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValueR } from '../../redux/slises/pizzaSlice';
const Search = () => {
	const dispatch = useDispatch();
	const searchR = useSelector((state) => state.pizzas.searhValue);
	// const { setsearchValue } = useContext(SearchContext);
	const inputRef = useRef();
	const [value, setValue] = React.useState('');
	const searhValueFunction = () => {
		dispatch(setSearchValueR(''));
		setValue('');
		// setsearchValue('');
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
		// dispatch(setSearchValueR(e.target.value));
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
			{searchR && (
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
