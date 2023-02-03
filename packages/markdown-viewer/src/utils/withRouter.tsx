import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * @description
 * 让类组件支持函数组件hooks,原理是返回一个包含传入类组件的函数组件
 * 导出组件时使用withRouter包裹类组件,就能在类组件中通过this.props.navigate使用navigate
 * @param Component
 * @returns {React.FC}
 */
export const withRouter = (Component) => {
	const Wrapper = memo((props) => {
		const navigate = useNavigate();
		return (
			<div>
				<Component navigate={navigate} {...props} />
			</div>
		);
	});
	return Wrapper;
};
