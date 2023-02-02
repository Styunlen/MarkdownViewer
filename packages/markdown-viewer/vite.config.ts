import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
/** 路径查找 */
const pathResolve = (dir: string): string => {
	return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
	'@': pathResolve('src'),
	'@public': pathResolve('public')
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias
	}
});
