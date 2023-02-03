import { menus } from '@/router';
import { Layout, Menu, theme } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const TheSider = memo(() => {
	const navigate = useNavigate();
	const localtion = useLocation();

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const [selectedKeys, setKeys] = useState(['0']);

	const refreshMenu = () => {
		const firstPath = `/${localtion.pathname.split('/')?.[1]}`;
		// 如果是首页
		if (firstPath == '/index') {
			return setKeys(['0']);
		}
		const key = menus.find((item) => firstPath == item.path)?.key;
		setKeys([key?.toString()]);
	};

	useEffect(() => {
		refreshMenu();
	}, []);

	useEffect(() => {
		refreshMenu();
	}, [localtion]);

	const handleClick = (evt) => {
		console.log(evt);
		const menuItem = menus.find((item) => item.key == evt.key);
		navigate(menuItem.path);
	};
	return (
		<Sider style={{ background: colorBgContainer }} width={200}>
			<Menu
				mode="inline"
				defaultSelectedKeys={selectedKeys}
				style={{ height: '100%' }}
				key={selectedKeys?.[0]}
				items={menus}
				onClick={handleClick}
			/>
		</Sider>
	);
});
export default TheSider;
