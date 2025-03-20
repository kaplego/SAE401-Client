import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import CardProduit from '@/components/CardProduit.vue';
import ProductView from '@/views/ProductView.vue';

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
		{
			path: '/produits/:id',
			component: ProductView,
		},
		{ path: '/:catchAll(.*)', component: NotFoundView },
	],
});

export default router;
