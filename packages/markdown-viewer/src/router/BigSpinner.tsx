import React from 'react';
import SpinnerStyle from './BigSpinner.module.css';

const BigSpinner: React.FC = () => {
	return (
		<div>
			<div className={SpinnerStyle.appLoadingWrap}>
				<div className={SpinnerStyle.spinner}>
					<div className={SpinnerStyle.doubleBounce1}></div>
					<div className={SpinnerStyle.doubleBounce2}></div>
				</div>
			</div>
		</div>
	);
};

export default BigSpinner;
