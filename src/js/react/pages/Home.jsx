import React, { useEffect, useState } from "react";
import Axios from "axios";
import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock.jsx";
import Sceleton from "../components/Sceleton.jsx";
const Home = () => {
	const [load, setLoad] = useState(true);
	const [items, setitems] = useState([]);
	useEffect(() => {
		async function fethData() {
			try {
				setLoad(true);
				const resp = await Axios.get("https://66853f80b3f57b06dd4bf714.mockapi.io/pizzas");
				console.log(resp.data);
				setitems(resp.data);
				setLoad(false);
			} catch (error) {
				console.log(error);
			}
		}

		fethData();
	}, []);
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
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
					items.map((pizza, index) => <PizzaBlock key={index} {...pizza} />)
				)}
			</div>
		</div>
	);
};

export default Home;
