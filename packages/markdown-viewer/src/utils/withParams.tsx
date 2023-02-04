import React, { memo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

/**
 * @description
 * 让类组件支持函数组件hooks,原理是返回一个包含传入类组件的函数组件
 * 导出组件时使用withParams包裹类组件,就能在类组件中通过this.props.params使用useParams
 * @param Component
 * @returns {React.FC}
 */
export const withParams = (Component) => {
	const Wrapper = memo((props) => {
		const params = useSearchParams();
		return (
			<div>
				<Component params={params} {...props} />
			</div>
		);
	});
	return Wrapper;
};
