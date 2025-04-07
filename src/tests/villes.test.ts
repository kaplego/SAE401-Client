import { useVillesStore } from '@/stores/api/villes';
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

const villes = useVillesStore();

test('are villes not null', () => {
	expect(useVillesStore).not.toBeNull();
});

test('are villes not empty', () => {
	expect(useVillesStore).length.above(0);
});

test('do villes contain villes', async () => {
	await sleep(7000);
	expect(villes.list?.[0]).toBeTypeOf('object');
}, 150000);
