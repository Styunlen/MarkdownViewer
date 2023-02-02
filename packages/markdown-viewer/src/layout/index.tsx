import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import React from 'react';
import TheMain from './components/TheMain';
import TheSider from './components/TheSider';

const { Header, Content, Footer } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
	key,
	label: `nav ${key}`
}));

const MarkdownViewerLayout: React.FC = () => {
	const {
		token: { colorBgContainer }
	} = theme.useToken();
	return (
		<Layout>
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={items1}
				/>
			</Header>
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
