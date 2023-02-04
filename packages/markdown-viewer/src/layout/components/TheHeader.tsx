import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';

const { Header } = Layout;

const navs: MenuProps['items'] = [{ key: '1', label: '主页' }];

const TheHeader: React.FC = () => {
	return (
		<Header className="header">
			<div className="logo" />
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				items={navs}
			/>
		</Header>
	);
};

export default TheHeader;
