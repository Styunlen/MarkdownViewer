import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';

const { Content } = Layout;

const TheMain: React.FC = () => {
	return (
		<Content style={{ padding: '0 24px', minHeight: 280 }}>
			<Outlet></Outlet>
		</Content>
	);
};

export default TheMain;
