import React from 'react';
import Header from './components/Header.jsx';
import Categories from './components/Categories.jsx';
import Sort from './components/Sort.jsx';
import PizzaBlock from './components/PizzaBlock.jsx';
import Pizzas from '../../files/pizzas.json';
const App = () => {
	return (
		<>
			<Header/>
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories/>
						<Sort/>
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{
							Pizzas.map((pizza, index)=> (
								<PizzaBlock key={index} {...pizza}/>
							))
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
