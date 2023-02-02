import 'antd/dist/reset.css';
import type { FC } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterRoot from './router';

const App: FC = () => (
	<div className="App">
		<React.StrictMode>
			<BrowserRouter>
				<RouterRoot></RouterRoot>
			</BrowserRouter>
		</React.StrictMode>
	</div>
);

export default App;
