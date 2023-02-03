import Reader from '@/pages/reader/';

const ReaderRoute: RouteConfig = {
	path: '/reader',
	redirect: '/reader/index',
	meta: {
		title: 'Markdown阅读器',
		showLink: true
	},
	children: [{ path: '/reader/index', element: <Reader></Reader> }]
};
export default ReaderRoute;
