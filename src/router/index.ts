import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import AccountView from '@/views/account/AccountView.vue';
import ProductView from '@/views/ProductView.vue';
import CategoryView from '@/views/CategoryView.vue';
import CartView from '@/views/CartView.vue';
import SearchView from '@/views/SearchView.vue';
import LoginView from '@/views/LoginView.vue';
import PersoDetailsView from '@/views/account/PersoDetailsView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/category/:id',
			name: 'category',
			component: CategoryView,
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
					component: PersoDetailsView,
				},
				{
					path: '/login',
					name: 'login',
					component: LoginView,
				},
			],
		},
		{
			path: '/cart',
			name: 'cart',
			component: CartView,
		},
		{
			path: '/produits/:id',
			name: 'produit',
			component: ProductView,
		},
		{
			path: '/search',
			name: 'search',
			component: SearchView,
		},
		{ path: '/:catchAll(.*)', component: NotFoundView },
	],
});

export default router;
