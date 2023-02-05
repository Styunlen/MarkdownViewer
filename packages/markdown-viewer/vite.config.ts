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
	},
	build: {
		sourcemap: false,
		// 消除打包大小超过500kb警告
		chunkSizeWarningLimit: 4000,
		rollupOptions: {
			input: {
				index: pathResolve('index.html')
			},
			// 静态资源分类打包
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
			},
			external: ['remark-Gfm']
		}
	}
});
