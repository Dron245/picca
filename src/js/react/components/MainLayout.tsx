import React from "react";
import { Outlet } from "react-router-dom";
import {Header} from "../components";
const MainLayout: React.FC = () => {
	return (
		<div>
			<Header />
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;