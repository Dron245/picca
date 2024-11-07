import React, { Suspense, lazy } from 'react';
// import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './components/MainLayout';
const Cart = lazy(() => import('./pages/Cart'));

// const FullPizza = Loadable({
// 	loader: () => import('./pages/FullPizza'),
// 	loading: () => <div>Идёт загрузка пиццы</div>,
// });
const FullPizza = lazy(() => import('./pages/FullPizza'));
const NotFound = lazy(() => import('./pages/NotFound'));
const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />}></Route>
				<Route
					path='cart'
					element={
						<Suspense fallback={<div>Идёт загрузка корзины...</div>}>
							<Cart />
						</Suspense>
					}
				></Route>
				<Route
					path='pizza/:id'
					element={
						<Suspense fallback={<div>Идёт загрузка </div>}>
							<FullPizza />
						</Suspense>
					}
				></Route>
				<Route
					path='*'
					element={
						<Suspense fallback={<div>Идёт загрузка </div>}>
							<NotFound />
						</Suspense>
					}
				></Route>
			</Route>
		</Routes>
	);
};

export default App;
