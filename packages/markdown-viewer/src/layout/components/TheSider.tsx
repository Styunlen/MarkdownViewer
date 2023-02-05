import { configs, menus } from '@/router';
import { pathResolve } from '@/router/hooks';
import { Layout, Menu, theme } from 'antd';
import path from 'path-browserify';
import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const TheSider = memo(() => {
	const navigate = useNavigate();
	const localtion = useLocation();

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const [selectedKeys, setKeys] = useState([]);

	const refreshMenu = () => {
		// 只比较根路径
		console.log(localtion);
		if (localtion.pathname == pathResolve('/index')) {
			return setKeys([0]);
		}
		const key =
			configs.find((item) => {
				const itemPath = pathResolve(item.path);
				console.log(localtion.pathname, itemPath);
				return (
					// 地址相等
					itemPath == localtion.pathname ||
					// 或根目录为当前菜单的根目录,且不是当前匹配项不是首页(所有目录路径都包含首页路径)
					(localtion.pathname.includes(itemPath) &&
						itemPath != pathResolve('/'))
				);
			})?.meta?.rank ?? -1;
		console.log(key);
		setKeys([key?.toString()]);
	};

	useEffect(() => {
		refreshMenu();
	}, []);

	useEffect(() => {
		refreshMenu();
	}, [localtion]);

	const handleClick = (evt) => {
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
