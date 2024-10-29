import React, { useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import './Search.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectorFilter, setSearchValue } from '../../redux/slises/filter';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const {searhValue} = useSelector(selectorFilter);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = React.useState<string>();
	const searhValueFunction = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const searchResp = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 200),
		[]
	);

	const changeSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		searchResp(event.target.value);
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
