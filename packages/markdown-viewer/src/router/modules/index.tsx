import Welcome from '@/pages/welcome';
import { Outlet } from 'react-router-dom';
const index: RouteConfig = {
	path: '/',
	name: 'Home',
	element: (
		<div>
			<h1>主页</h1>
			<Outlet></Outlet>
		</div>
	),
	redirect: '/index',
	meta: {
		title: '主页',
		rank: 0
	},
	children: [{ path: '/index', element: <Welcome></Welcome> }]
};
export default index;
