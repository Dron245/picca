import React, { createContext, useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';

export const SearchContext = createContext({});
const App = () => {
	const [searchValue, setsearchValue] = useState('');
	// const [sortvisible, setSortvisible] = useState(false);
	
	return (
			<SearchContext.Provider
				value={{ searchValue, setsearchValue }}
			>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/cart' element={<Cart />}></Route>
						<Route path='*' element={<NotFound />}></Route>
					</Routes>
				</div>
			</SearchContext.Provider>
	);
};

export default App;
