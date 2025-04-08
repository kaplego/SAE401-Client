import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
	},
	e2e: {
		supportFile: false,
		setupNodeEvents(_on, _config) {
			// implement node event listeners here
		},
	},
});
