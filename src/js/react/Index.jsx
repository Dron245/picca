import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
// Объект для вывода
const root = document.querySelector('#root')
	? document.querySelector('#root')
	: document.querySelector('.wrapper');

// Main rendering
ReactDOM.createRoot(root).render(
	// <React.StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
	// </React.StrictMode>
);
