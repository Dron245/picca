import React from "react";
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
	value: number;
	changeCategory: (index: number)=>void;
}
const category = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

const Categories: React.FC<CategoriesProps> = React.memo(({value, changeCategory}) => {
	console.log(222);
	
	useWhyDidYouUpdate('Categories', {value, changeCategory})
	return (
		<div className="categories">
			<ul>
				{category.map((item, index) => (
					<li
						onClick={() => changeCategory(index)}
						key={index}
						className={value === index ? "active" : ''}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
})

export default Categories;
