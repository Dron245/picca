import React, { createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slises/slice.js';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';

export const SearchContext = createContext({});
const App = () => {
	const count = useSelector((state)=> state.value);
	const dispatch = useDispatch();
	const [searchValue, setsearchValue] = useState('');
	const [sortvisible, setSortvisible] = useState(false);
	function closeSortMenu() {
		sortvisible && setSortvisible(false);
	}
	return (
		<div>
			<div>
				<button aria-label='Increment value' onClick={() => dispatch(increment())}>
					Increment
				</button>
				<span>{count}</span>
				<button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
					Decrement
				</button>
			</div>
		</div>
		// <div onClick={() => closeSortMenu()}>
		// 	<SearchContext.Provider
		// 		value={{ searchValue, setsearchValue, sortvisible, setSortvisible }}
		// 	>
		// 		<Header />
		// 		<div className='content'>
		// 			<Routes>
		// 				<Route path='/' element={<Home />}></Route>
		// 				<Route path='/cart' element={<Cart />}></Route>
		// 				<Route path='*' element={<NotFound />}></Route>
		// 			</Routes>
		// 		</div>
		// 	</SearchContext.Provider>
		// </div>
	);
};

export default App;
