import Page from '@/pages/editor/index';

const Editor: RouteConfig = {
	path: '/editor',
	redirect: '/editor/index',
	meta: {
		title: 'MarkDown编辑器',
		showLink: true
	},
	children: [{ path: '/editor/index', element: <Page></Page> }]
};
export default Editor;
