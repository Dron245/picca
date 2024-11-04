import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./components/MainLayout";
const Cart = React.lazy(()=> import('./pages/Cart'))
const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />}></Route>
					<Route
						path="cart"
						element={
							<Suspense fallback={<div>Идёт загрузка корзины...</div>}>
								<Cart />
							</Suspense>
						}></Route>
					<Route path="pizza/:id" element={<FullPizza />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
