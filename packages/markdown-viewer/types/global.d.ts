declare global {
	interface RouteConfig {
		/** 路由地址 `必填` */
		path: string;
		/** 路由名字（保持唯一）`可选` */
		name?: string;
		/** 组件 `可选` */
		element?: React.ReactNode | null;
		/** 路由重定向 `可选` */
		redirect?: string;
		meta?: {
			/** 菜单名称 `必填` */
			title: string;
			/** 菜单图标 `可选` */
			icon?: React.ReactNode;
			/** 是否在菜单中显示（默认`true`）`可选` */
			showLink?: boolean;
			/** 菜单显示顺序（越小越前）`可选` */
			rank?: number;
		};
		children?: Array<RouteConfig>;
	}
}
export {};
