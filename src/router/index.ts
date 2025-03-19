import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import { useLoadingStore } from '@/stores/loading';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{ path: '/:catchAll(.*)', component: NotFoundView },
	],
});

router.beforeEach((_to, _from, next) => {
	const isLoading = useLoadingStore();
	isLoading.switchLoading(true);
	next();
});

export default router;
