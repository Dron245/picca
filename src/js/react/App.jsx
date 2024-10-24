import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';
import FullPizza from './pages/FullPizza.jsx';
import MainLayout from './components/MainLayout.jsx';

const App = () => {
	
	return (
		<>
			
				<Routes>
					<Route path='/' element={<MainLayout />}>
						<Route path='' element={<Home />}></Route>
						<Route path='cart' element={<Cart />}></Route>
						<Route path='pizza/:id' element={<FullPizza />}></Route>
						<Route path='*' element={<NotFound />}></Route>
					</Route>
				</Routes>
		</>
	);
};

export default App;
