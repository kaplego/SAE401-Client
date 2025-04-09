export default function isInEnum<T extends object>(e: T, value: unknown): value is T[keyof T] {
	const values = Object.values(e);
	return values.includes(value);
}

/**
 * Formatter un numéro de téléphone
 *
 * @example
 * ```
 * const phone = '33123456789';
 * console.log(phoneFormat(phone)); // => '01 23 45 67 89'
 * ```
 */
export function phoneFormat(phone: string) {
	if (!/^33\d{9}$/.test(phone)) return phone;

	const arr = phone.substring(2).split('');
	const res = [`0${arr[0]}`];
	for (let i = 1; i < 9; i += 2) res.push(`${arr[i]}${arr[i + 1]}`);
	return res.join(' ');
}
/**
 * Déformatter un numéro de téléphone
 *
 * @example
 * ```
 * const phone = '01 23 45 67 89';
 * console.log(phoneReverseFormat(phone)); // => '33123456789'
 * ```
 */
export function phoneReverseFormat(formatted: string) {
	if (/^0\d( \d{2}){4}$/.test(formatted)) return `33${formatted.substring(1).replace(/ /g, '')}`;
	return formatted;
}

/** Ajoute des espaces dans les champs de téléphone */
export function phoneInput(event: InputEvent) {
	if (event.target instanceof HTMLInputElement) {
		if (
			event.data !== null &&
			event.target.selectionStart === event.target.value.length &&
			event.target.value.length > 0 &&
			event.target.value.length < 14
		) {
			const nums = event.target.value.split(' ');
			if (nums.at(-1)?.length === 3) event.target.value = `${nums.join(' ').slice(0, -1)} ${event.data}`;
		}
	}
}

/** Retire les espaces dans les champs de téléphone */
export function phoneKeydown(event: KeyboardEvent) {
	if (
		event.key === 'Backspace' &&
		event.target instanceof HTMLInputElement &&
		event.target.selectionStart === event.target.value.length
	) {
		if (event.target.value.lastIndexOf(' ') === event.target.value.length - 2)
			event.target.value = event.target.value.substring(0, event.target.value.length - 1);
	}
}

/**
 * Formatter un numéro de carte bancaire
 *
 * @example
 * ```
 * const card = '1234567812345678';
 * console.log(cardNumberFormat(card)); // => '1234 5678 1234 5678'
 * ```
 */
export function cardNumberFormat(card: string) {
	const arr = card.split('');
	const res = [];
	for (let i = 0; i < 16; i += 4) res.push(arr.slice(i, i + 4).join(''));
	return res.join(' ');
}
/**
 * Déformatter un numéro de carte bancaire
 *
 * @example
 * ```
 * const card = '1234 5678 1234 5678';
 * console.log(cardNumberReverseFormat(card)); // => '1234567812345678'
 * ```
 */
export function cardNumberReverseFormat(formatted: string) {
	if (/^\d{4}( \d{4}){3}$/.test(formatted)) return `${formatted.replace(/ /g, '')}`;
	return formatted;
}

/**
 * Calculer le prix final en fonction du prix de base et du prix en soldes
 *
 * @example
 * ```
 * const prixDeBase = 30;
 * console.log(finalPrice(prixDeBase)) // => 30
 *
 * const prixEnSolde = 28;
 *
 * console.log(finalPrice(prixDeBase, prixEnSolde)) // => 28
 * console.log(finalPrice(prixDeBase, prixEnSolde, 3)) // => 84
 * ```
 */
export function finalPrice(basePrice: number, salePrice?: number | null, quantity: number = 1) {
	return (salePrice ?? basePrice) * quantity;
}

function pathToLabel(path: string) {
	return path
		.split('-')
		.map((v) => v[0].toUpperCase() + v.substring(1))
		.join(' ');
}

/**
 * Convertit un lien (pathname) en items de breadcrumb
 *
 * @example
 * ```
 * const pathname = '/test/item/1';
 * const labels = ['Test', 'Item', 'First'];
 *
 * console.log(pathnameToBreadcrumb(pathname, labels));
 * // => [
 * // 	{ key: '0', label: 'Test', type: 'link', path: '/test' },
 * // 	{ key: '1', label: 'Item', type: 'link', path: '/test/item' },
 * // 	{ key: '2', label: 'First', type: 'text' }
 * // ]
 * ```
 */
export function pathnameToBreadcrumb(
	path: string,
	labels: string[] | null = null,
	startsAtIndex: number = 0,
): AnyBreadcrumbItem[] {
	const segments = path.replace(/^\//, '').split('/');
	if (segments.length <= startsAtIndex) return [];

	const last = segments.pop()!;

	const items: AnyBreadcrumbItem[] = [];

	segments.reduce((path, segment, index) => {
		path += `/${segment}`;
		if (!startsAtIndex || index >= startsAtIndex)
			items.push({
				key: index.toString(),
				label: labels?.[index - (startsAtIndex ?? 0)] ?? pathToLabel(segment),
				type: 'link',
				path,
			});
		return path;
	}, '');

	items.push({
		key: segments.length.toString(),
		label: labels?.[segments.length - (startsAtIndex ?? 0)] ?? pathToLabel(last),
		type: 'text',
	});

	return items;
}

/** Affiche un avertissement si le temps jusqu'à la date d'expiration de la
 * carte de crédit est inférieur à ce nombre de millisecondes. */
export const CARD_EXPIRATION_WARNING = 60 * 24 * 60 * 60 * 1000;

export const BCRYPT_ROUNDS = 12;

export const TESTS_ASYNC_TIMEOUT = 60_000;

export enum OrdersSortMode {
	Date = 'Date',
	Price = 'Prix',
}

export enum AutocompleteType {
	/** Autocomplète la chaîne par la valeur plus proche */
	Near,
	/** Autocomplète la chaîne par la valeur qui commence pareille */
	Exact,
	/** Autocomplète la chaîne par la valeur qui commence pareille,
	 * ou la valeur la plus proche si non trouvée. */
	ExactWithFallback,
}

/** Calcule la distance de Levenshtein entre deux chaînes de caractères. */
export function levenshteinDistance(a: string, b: string): number {
	const m = a.length;
	const n = b.length;
	const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

	for (let i = 0; i <= m; i++) {
		dp[i][0] = i;
	}

	for (let j = 0; j <= n; j++) {
		dp[0][j] = j;
	}

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (a[i - 1] === b[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 1);
			}
		}
	}

	return dp[m][n];
}
