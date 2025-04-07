import { useCategoriesStore } from '@/stores/api/categories';
import { expect, test } from 'vitest';


import App from '../App.vue';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

function sleep(ms: number = 200) {
	return new Promise<void>((r) => {
		setTimeout(() => {
			r();
		}, ms);
	});
}

const categories = useCategoriesStore();

test('are categories not null', () => {
	expect(useCategoriesStore).not.toBeNull();
});

test('are categories not empty', () => {
	expect(useCategoriesStore).length.above(0);
});

test('do categories contain categories', async () => {
	await sleep(2000);
	expect(categories.list?.[0]).toBeTypeOf('object');
});
