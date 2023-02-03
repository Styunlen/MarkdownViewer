import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @description
 * 让类组件支持函数组件hooks,原理是返回一个包含传入类组件的函数组件
 * 导出组件时使用withLocation包裹类组件,就能在类组件中通过this.props.location使用useLocation
 * @param Component
 * @returns {React.FC}
 */
export const withLocation = (Component) => {
	const Wrapper = memo((props) => {
		const location = useLocation();
		return (
			<div>
				<Component location={location} {...props} />
			</div>
		);
	});
	return Wrapper;
};
