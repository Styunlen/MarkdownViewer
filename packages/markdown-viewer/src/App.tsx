import 'antd/dist/reset.css';
import type { FC } from 'react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RouterRoot from './router';

const App: React.FC = () => (
	<div className="App">
		<BrowserRouter>
			<RouterRoot></RouterRoot>
		</BrowserRouter>
	</div>
);

export default App;
