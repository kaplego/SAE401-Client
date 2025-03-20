import isInEnum from '@/assets/ts/utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum THEME {
	Light = 'light',
	Dark = 'dark',
	DarkDim = 'darkdim',
}

export const useThemeStore = defineStore('theme', () => {
	const storedTheme = localStorage.getItem('theme');
	const currentTheme = ref(
		isInEnum(THEME, storedTheme)
			? storedTheme
			: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
				? THEME.Dark
				: THEME.Light,
	);
	document.body.classList.add(`theme-${currentTheme.value}`);

	function switchTheme(newTheme: THEME) {
		document.body.classList.remove(`theme-${currentTheme.value}`);
		document.body.classList.add(`theme-${newTheme}`);
		currentTheme.value = newTheme;
		localStorage.setItem('theme', newTheme);
	}

	return { currentTheme, switchTheme };
});
