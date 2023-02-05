import { Empty } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import {
	NavigateFunction,
	RouteObject as RouteObjectRaw
} from 'react-router-dom';

export type RouteObject = RouteObjectRaw & {
	redirect: (navigate: NavigateFunction) => Promise<void> | void;
	children: Array<RouteObject>;
};

export type MenuItemType = ItemType & {
	path;
	name;
	/* 
		这个是RouteConfig里的菜单顺序, 
		ItemType中还定义了一个key, 数值上, 两者相等
	*/
	rank;
};

const parseRouteConfig = (config: RouteConfig): RouteObject => {
	let ret: RouteObject = {
		path: config?.path,
		element: config?.element,
		redirect: async (navigate: NavigateFunction) => {
			config?.redirect && navigate(config?.redirect);
		},
		errorElement: (
			<div>
				<Empty />
				<center>404 Not Found</center>
			</div>
		),
		children: config?.children?.map((childConfig) =>
			parseRouteConfig(childConfig)
		)
	};
	return ret;
};
const parseMenuInfo = (config: RouteConfig): MenuItemType => {
	return {
		/* 
			ItemType中定义的key,用于表示菜单项的唯一性,
			因为rank自动生成且唯一,所以这里用rank的值填充
		*/
		key: config?.meta?.rank,
		icon: config?.meta?.icon,
		label: config?.meta?.title ?? config?.path,
		name: config?.name,
		path: config.path,
		rank: config?.meta?.rank
	};
};
// 从modules中读取Config表
const getConfigs = (modules: Record<string, any>): Array<RouteConfig> => {
	const configs: Array<RouteConfig> = [];

	Object.keys(modules).forEach((key, index) => {
		const config = modules[key].default;
		config && configs.push(config);
	});

	return configs;
};

// 将Config表转换为routes
const handleConfigs = (configs: Array<RouteConfig>): Array<RouteObject> => {
	return configs.map((config) => parseRouteConfig(config));
};

// 判断是否需要处理rank
function handRank(routeInfo: RouteConfig) {
	const { name, path, meta } = routeInfo;
	const notHome = (name, path, meta) => {
		return meta?.rank === 0 && name !== 'Home' && path !== '/';
	};
	// 除了首页不处理,其他都处理
	return notHome(name, path, meta.rank) || meta.rank == undefined
		? true
		: false;
}

/** 按照RouteConfig中meta下的rank顺序升序排序menus */
function getAscendingMenus(configs: Array<RouteConfig>): Array<MenuItemType> {
	configs.forEach((v, index) => {
		// 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
		if (handRank(v)) {
			v.meta.rank = index + 2;
		}
	});

	return (
		configs
			// 过滤掉不显示在菜单内的路由
			.filter((config) => config.meta.showLink != false)
			// 排序
			.sort((a, b) => {
				return a.meta.rank - b.meta.rank;
			})
			// 解析为MenuItem
			.map((config) => parseMenuInfo(config))
	);
}

// 将多维routes变成一维,以便于搜索
const flatRoutes = (routes: Array<RouteObject>): Array<RouteObject> => {
	const ret: Array<RouteObject> = [];
	ret.push(
		...routes.map((route) => {
			if (route.children) {
				const children = flatRoutes(route.children);
				ret.push(...children);
				delete route.children;
			}
			return route;
		})
	);
	return ret;
};

export {
	parseRouteConfig,
	parseMenuInfo,
	getConfigs,
	handleConfigs,
	getAscendingMenus,
	flatRoutes
};
