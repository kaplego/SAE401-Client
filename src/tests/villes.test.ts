import { useVillesStore } from '@/stores/api/villes';
import { expect, test } from 'vitest';

import App from '@/App.vue';
import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import { createPinia } from 'pinia';
import { TESTS_ASYNC_TIMEOUT } from '@/assets/ts/utils';

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

const villes = useVillesStore();

test('are villes not null', () => {
	expect(useVillesStore).not.toBeNull();
});

test('are villes not empty', () => {
	expect(useVillesStore).length.above(0);
});

test('do villes contain villes', async () => {
	return new Promise((r) => {
		villes.onLoad(() => {
			r(expect(villes.list?.[0]).toBeTypeOf('object'));
		});
	});
}, TESTS_ASYNC_TIMEOUT);
