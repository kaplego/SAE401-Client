import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import AccountView from '@/views/AccountView.vue';
import ProductView from '@/views/ProductView.vue';
<<<<<<< Updated upstream
=======
import CategoryView from '@/views/CategoryView.vue';
// import CartView from '@/views/CartView.vue';
>>>>>>> Stashed changes

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
			path: '/account',
			name: 'account',
			children: [
				{
					path: '/account',
					name: 'account_dashboard',
					component: AccountView,
				},
				{
					path: '/account/personnal-details',
					name: 'account_personnal',
					component: NotFoundView,
				},
			],
		},
<<<<<<< Updated upstream
=======
		// {
		// 	path: '/cart',
		// 	name: 'cart',
		// 	component: CartView,
		// },
>>>>>>> Stashed changes
		{
			path: '/produits/:id',
			name: 'produit',
			component: ProductView,
		},
		{ path: '/:catchAll(.*)', component: NotFoundView },
	],
});

export default router;
