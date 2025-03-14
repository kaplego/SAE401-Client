import isInEnum from '@/assets/ts/utils';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum THEME {
	Light = 'light',
	Dark = 'dark',
}

export const useThemeStore = defineStore('theme', () => {
	const storedTheme = localStorage.getItem('theme');
	const currentTheme = ref(isInEnum(THEME, storedTheme) ? storedTheme : THEME.Light);
	document.body.classList.add(`theme-${currentTheme.value}`);

	function switchTheme(newTheme: THEME) {
		document.body.classList.remove(`theme-${currentTheme.value}`);
		document.body.classList.add(`theme-${newTheme}`);
		currentTheme.value = newTheme;
		localStorage.setItem('theme', newTheme);
	}

	return { currentTheme, switchTheme };
});
