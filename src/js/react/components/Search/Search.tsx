import React, { Dispatch, SetStateAction, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import "./Search.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";
import { selectorFilter } from "../../redux/filter/selectors";
type SearchProps = {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};
export const Search: React.FC<SearchProps> = ({ value, setValue }) => {
	const dispatch = useDispatch();
	const { searhValue } = useSelector(selectorFilter);
	const inputRef = useRef<HTMLInputElement>(null);

	const searhValueReset = (event: React.MouseEvent<HTMLImageElement>) => {
		dispatch(setSearchValue(""));
		setValue("");
		inputRef.current?.focus();
	};

	const updateSearchValue = useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 200),
		[]
	);

	const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};
	return (
		<div className="input-search">
			<input
				ref={inputRef}
				value={value}
				name="search"
				onChange={(e) => changeSearch(e)}
				placeholder="Поиск пиццы..."
				type="text"
				className="input-search__input"
			/>
			{searhValue && (
				<img
					onClick={searhValueReset}
					className="input-search__icon"
					src="img/close-svgrepo-com.svg"
					alt="Image"
				/>
			)}
		</div>
	);
};
