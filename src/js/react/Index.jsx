import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App.jsx'


// Объект для вывода
const root = document.querySelector("#root")
	? document.querySelector("#root")
	: document.querySelector(".wrapper");

// Main rendering
ReactDOM.createRoot(root).render(
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
);
