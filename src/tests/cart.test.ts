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
const cart = useCartStore();

test("addToCart/ isInCart fonctionne", () => {
	cart.addToCart(12, 15);
	expect(cart.isInCart(12, 15)).toBeTruthy();
	cart.removeFromCart(12, 15);
});

test("removeFromCart fonctionne", () => {
	cart.addToCart(12, 15);
	expect(cart.removeFromCart(12, 15)).toBeTruthy();
});

test("setQuantity / getQuantity fonctionne", () => {
	cart.addToCart(12, 15);
	cart.setQuantity(12, 15, 238);
	expect(cart.getQuantity(12, 15)).toBe(238);
	cart.removeFromCart(12, 15);
});

test("isInCart fonctionne", () => {
	cart.addToCart(12, 15);
	expect(cart.isInCart(12, 15)).toBeTruthy();
	expect(cart.isInCart(342, 15)).toBeFalsy();
	expect(cart.isInCart(12, 12)).toBeFalsy();
	cart.removeFromCart(12, 15);
});












