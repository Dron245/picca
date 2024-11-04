import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// Объект для вывода
const root = document.querySelector("#root")
	? document.querySelector("#root")
	: document.querySelector(".wrapper");

if (root) {
	ReactDOM.createRoot(root).render(
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	);
}
