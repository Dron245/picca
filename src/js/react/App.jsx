import React, { useState } from "react";
import Header from "./components/Header.jsx";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
const App = () => {
	const [searchValue, setsearchValue] = useState('')
	return (
		<>
			<Header searchValue={searchValue} setsearchValue={setsearchValue} />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home searchValue={searchValue} />}></Route>
					<Route path="/cart" element={<Cart />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
		</>
	);
};

export default App;
