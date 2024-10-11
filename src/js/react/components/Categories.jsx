import React from "react";

const Categories = ({value, changeCatehory}) => {
	const category = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
	return (
		<div className="categories">
			<ul>
				{category.map((item, index) => (
					<li
						onClick={() => changeCatehory(index)}
						key={index}
						className={value === index ? "active" : null}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
