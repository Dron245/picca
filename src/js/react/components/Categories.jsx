import React, { useState } from "react";

const Categories = () => {
	const [categoryIndex, setcategoryIndex] = useState(0);
	const category = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
	return (
		<div className="categories">
			<ul>
				{category.map((item, index) => (
					<li
						onClick={() => setcategoryIndex(index)}
						key={index}
						className={categoryIndex === index ? "active" : null}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
