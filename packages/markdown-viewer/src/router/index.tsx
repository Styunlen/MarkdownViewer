import MarkdownViewerLayout from '@/layout';
import { Empty } from 'antd';
import React, { memo } from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import {
	getAscendingMenus,
	getConfigs,
	handleConfigs,
	MenuItemType,
	RouteObject
} from './hooks';

const modules: Record<string, any> = import.meta.glob(['./modules/**/*.tsx'], {
	eager: true
});
const configs: Array<RouteConfig> = [];
let routes: Array<RouteObject> = [];
export const menus: Array<MenuItemType> = [];

configs.push(...getConfigs(modules));
routes = routes.concat(handleConfigs(configs));
menus.push(...getAscendingMenus(configs));

// console.log(menus);
// console.log(routes);

const RouterRoot: React.FC = memo(() => {
	const router = useRoutes([
		{
			path: '/',
			element: <MarkdownViewerLayout />,
			errorElement: (
				<div>
					<Empty />
					<center>404 Not Found</center>
				</div>
			),
			children: [...routes]
		}
	]);
	const location = useLocation();
	const navigate = useNavigate();
	React.useEffect.call(
		this,
		() => {
			console.log(location);
			routes
				.find(
					(route) =>
						location.pathname == route.path ||
						location.pathname == route.path + '/'
				)
				?.redirect(navigate);
		},
		[location]
	);
	return <div>{router}</div>;
});

export default RouterRoot;
