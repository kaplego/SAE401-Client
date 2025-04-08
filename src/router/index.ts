import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import DashboardView from '@/views/account/DashboardView.vue';
import ProductView from '@/views/ProductView.vue';
import CategoryView from '@/views/CategoryView.vue';
import CartView from '@/views/cart/CartView.vue';
import SearchView from '@/views/SearchView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import PersoDetailsView from '@/views/account/PersoDetailsView.vue';
import AdressesView from '@/views/account/AdressesView.vue';
import BankDetailsView from '@/views/account/BankDetailsView.vue';
import PaymentView from '@/views/cart/PaymentView.vue';
import OrdersView from '@/views/account/OrdersView.vue';
import AccountView from '@/views/account/AccountView.vue';
import AuthView from '@/views/auth/AuthView.vue';
import SignupView from '@/views/auth/SignupView.vue';
import OrderDetailsView from '@/views/account/OrderDetailsView.vue';

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
			path: '/compte',
			name: 'account',
			component: AccountView,
			children: [
				{
					path: '/compte',
					name: 'account_dashboard',
					component: DashboardView,
				},
				{
					path: '/compte/informations-personelles',
					name: 'account_personnal',
					component: PersoDetailsView,
				},
				{
					path: '/compte/informations-bancaires',
					name: 'account_bank',
					component: BankDetailsView,
				},
				{
					path: '/compte/adresses',
					name: 'account_addresses',
					component: AdressesView,
				},
				{
					path: '/compte/commandes',
					name: 'account_orders',
					component: OrdersView,
				},
				{
					path: '/compte/commandes/:id',
					name: 'account_order',
					component: OrderDetailsView,
				},
			],
		},
		{
			path: '/auth',
			name: 'login',
			component: AuthView,
			children: [
				{
					path: '/auth/connexion',
					name: 'auth_login',
					component: LoginView,
				},
				{
					path: '/auth/inscription',
					name: 'auth_signup',
					component: SignupView,
				},
			],
		},
		{
			path: '/cart',
			name: 'cart',
			component: CartView,
		},
		{
			path: '/payment',
			name: 'payment',
			component: PaymentView,
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
