import { Alert, Empty } from 'antd';
import React from 'react';

class Welcome extends React.Component {
	render(): React.ReactNode {
		return (
			<div>
				<Alert message="欢饮来到主页" type="success" closable />
				<Empty style={{ paddingTop: 20 }}>这里现在空空如也</Empty>
			</div>
		);
	}
}
export default Welcome;
