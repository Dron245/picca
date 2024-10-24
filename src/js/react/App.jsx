import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';
import FullPizza from './pages/FullPizza.jsx';

const App = () => {
	
	return (
		<>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/cart' element={<Cart />}></Route>
					<Route path='/pizza/:id' element={<FullPizza />}></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Routes>
			</div>
		</>
	);
};

export default App;
