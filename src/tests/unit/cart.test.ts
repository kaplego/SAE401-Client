import { useCartStore } from "@/stores/cart";
import { expect, test } from 'vitest';
import { createApp } from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

test("addToCart/ isInCart fonctionne", () => {
	useCartStore().addToCart(12, 15);
	expect(useCartStore().isInCart(12, 15)).toBeTruthy();
	useCartStore().removeFromCart(12, 15);
});

test("removeFromCart fonctionne", () => {
	useCartStore().addToCart(12, 15);
	expect(useCartStore().removeFromCart(12, 15)).toBeTruthy();
});

test("setQuantity / getQuantity fonctionne", () => {
	useCartStore().addToCart(12, 15);
	useCartStore().setQuantity(12, 15, 238);
	expect(useCartStore().getQuantity(12, 15)).toBe(238);
	useCartStore().removeFromCart(12, 15);
});

test("isInCart fonctionne", () => {
	useCartStore().addToCart(12, 15);
	expect(useCartStore().isInCart(12, 15)).toBeTruthy();
	expect(useCartStore().isInCart(342, 15)).toBeFalsy();
	expect(useCartStore().isInCart(12, 12)).toBeFalsy();
	useCartStore().removeFromCart(12, 15);
});












