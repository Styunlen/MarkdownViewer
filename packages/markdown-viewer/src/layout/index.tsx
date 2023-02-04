import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import TheHeader from './components/TheHeader';
import TheMain from './components/TheMain';
import TheSider from './components/TheSider';

const { Header, Content, Footer } = Layout;

const MarkdownViewerLayout: React.FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	return (
		<Layout>
			<TheHeader></TheHeader>
			<Content style={{ padding: '0 50px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Layout style={{ padding: '24px 0', background: colorBgContainer }}>
					<TheSider></TheSider>
					<Content style={{ padding: '0 24px', minHeight: 280 }}>
						<TheMain></TheMain>
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: 'center' }}>©2023 九仞 版权所有</Footer>
		</Layout>
	);
};

export default MarkdownViewerLayout;
