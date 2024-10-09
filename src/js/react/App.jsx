import React from 'react';
import Header from './components/Header.jsx';
import Categories from './components/Categories.jsx';
import Sort from './components/Sort.jsx';
import PizzaBlock from './components/PizzaBlock.jsx';

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
						<PizzaBlock title= 'Мексиканская' cost={500} />
						<PizzaBlock title= 'Аравийская' cost={400} />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
