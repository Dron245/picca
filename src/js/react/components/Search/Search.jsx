import React from "react";
import "./Search.scss";
const Search = ({ searchValue, setsearchValue }) => {
	return (
		<div className="input-search">
			<input
				value={searchValue}
				onChange={(e) => {
					setsearchValue(e.target.value);
				}}
				placeholder="Поиск пиццы..."
				type="text"
				className="input-search__input"
			/>
			{searchValue && (
				<img onClick={()=>setsearchValue('')} className="input-search__icon" src="img/close-svgrepo-com.svg" alt="Image" />
			)}
		</div>
	);
};

export default Search;
