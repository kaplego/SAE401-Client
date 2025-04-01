import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import dotenv from 'dotenv';
dotenv.config({
	path: [process.cwd(), '.env.local'],
});

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	define: {
		'process.env': JSON.stringify({
			API_ENDPOINT: process.env.API_ENDPOINT,
		}),
	},
});
