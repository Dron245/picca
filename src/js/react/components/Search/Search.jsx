import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import './Search.scss';
import { SearchContext } from '../../App.jsx';


const Search = () => {
	const { setsearchValue } = useContext(SearchContext);
	const inputRef = useRef();
	const [value, setValue] = useState('');
	const searhValueFunction = () => {
		setValue('');
		setsearchValue('');
		inputRef.current.focus();
	};


	const searchResp = useCallback(
		debounce((str) => {
			setsearchValue(str);
		}, 200)
		,[]);

	 const changeSearch = ((e)=> {
		setValue(e.target.value)
		searchResp(e.target.value)
	})
	return (
		<div className='input-search'>
			<input
				ref={inputRef}
				value={value}
				name='search'
				onChange={changeSearch}
				placeholder='Поиск пиццы...'
				type='text'
				className='input-search__input'
			/>
			{value && (
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
