import { Tag } from 'antd';

const Example: RouteConfig = {
	path: '/example',
	redirect: '/example/index',
	meta: {
		title: '测试样例主页',
		showLink: false
	},
	children: [{ path: '/example/index', element: <Tag>Test</Tag> }]
};
export default Example;
