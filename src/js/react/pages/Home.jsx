import React, { useEffect, useState } from "react";
import Axios from "axios";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Sceleton from "../components/Sceleton.jsx";
import Pagination from "../components/Pagination/Pagination.jsx";
const Home = ({ searchValue }) => {
	const [load, setLoad] = useState(true);
	const [items, setitems] = useState([]);
	const [categoryIndex, setcategoryIndex] = useState(0);
	const [activeSort, setactiveSort] = useState({
		name: "популярности",
		sortName: "rating",
	});
	const [sortvisible, setsortvisible] = useState(false);
	const [changeCurrentPage, setChangeCurrentPage] = useState(1)
	useEffect(() => {
		async function fethData() {
			try {
				setLoad(true);
				const url = "https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas";
				const category = categoryIndex > 0 ? `category=${categoryIndex}` : "";
				const search = searchValue ? `search=${searchValue}` : "";
				const sort = activeSort.sortName.replace("-", "");
				const sortDirection = activeSort.sortName.includes("-") ? "asc" : "desc";
				const resp = await Axios.get(
					`${url}?${category}&${search}&sortBy=${sort}&order=${sortDirection}&page=${changeCurrentPage}&limit=4`
				);
				// console.log(resp.data);
				setitems(resp.data);
				setLoad(false);
			} catch (error) {
				console.log(error);
			}
		}

		fethData();
	}, [categoryIndex, activeSort, searchValue, changeCurrentPage]);
	function closeSortMenu() {
		sortvisible && setsortvisible(false);
	}
	// console.log({sortvisible});
	return (
		<div onClick={() => closeSortMenu()} className="container">
			<div className="content__top">
				<Categories
					value={categoryIndex}
					changeCatehory={(index) => setcategoryIndex(index)}
				/>
				<Sort
					sortType={activeSort}
					changeSort={(index) => setactiveSort(index)}
					visible={sortvisible}
					changeVisible={setsortvisible}
				/>
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{load ? (
					<>
						{[...Array(8)].map((_, i) => (
							<Sceleton key={i} />
						))}
					</>
				) : (
					items
						// .filter((pizza) => pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
						.map((pizza, index) => <PizzaBlock key={index} {...pizza} />)
				)}
			</div>
			<Pagination onChangePage={(number)=> setChangeCurrentPage(number)}/>
		</div>
	);
};

export default Home;
