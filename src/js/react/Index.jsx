import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
// Объект для вывода
const root = document.querySelector('#root')
	? document.querySelector('#root')
	: document.querySelector('.wrapper');

ReactDOM.createRoot(root).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>

);
