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
	defaultCommandTimeout: 60000,
	viewportHeight: 800,
	viewportWidth: 1280,
});
