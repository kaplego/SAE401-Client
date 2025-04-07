import { usePaysStore } from '@/stores/api/pays';
import { expect, test } from 'vitest';


import App from '@/App.vue';
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

const pays = usePaysStore();

test('are pays not null', () => {
	expect(usePaysStore).not.toBeNull();
});

test('are pays not empty', () => {
	expect(usePaysStore).length.above(0);
});

test('do pays contain pays', async () => {
	await sleep(5000);
	expect(pays.list?.[0]).toBeTypeOf('object');
}, 150000);
