export default function isInEnum<T extends object>(e: T, value: unknown): value is T[keyof T] {
	const values = Object.values(e);
	return values.includes(value);
}

export function stringFormat(str: string, args: Record<string, string>) {
	Object.entries(args).forEach(([key, val]) => {
		str.replace(`{${key}}`, val);
	});
	return str;
}

/** Formatter un numéro de téléphone */
export function phoneFormat(phone: string) {
	if (!/^33\d{9}$/.test(phone)) return phone;

	const arr = phone.substring(2).split('');
	const res = [`0${arr[0]}`];
	for (let i = 1; i < 9; i += 2) res.push(`${arr[i]}${arr[i + 1]}`);
	return res.join(' ');
}
/** Déformatter un numéro de téléphone */
export function phoneReverseFormat(formatted: string) {
	if (/^0[0-9]( [0-9]{2}){4}$/.test(formatted)) return `33${formatted.substring(1).replace(/ /g, '')}`;
	return formatted;
}

/** Formatter un numéro de carte bancaire */
export function cardNumberFormat(card: string) {
	const arr = card.split('');
	const res = [];
	for (let i = 0; i < 16; i += 4) res.push(arr.slice(i, i + 4).join(''));
	return res.join(' ');
}
/** Déformatter un numéro de carte bancaire */
export function cardNumberReverseFormat(formatted: string) {
	if (/^0[0-9]( [0-9]{2}){4}$/.test(formatted)) return `33${formatted.substring(1).replace(/ /g, '')}`;
	return formatted;
}

export function finalPrice(basePrice: number, salePrice?: number | null, quantity: number = 1) {
	return (salePrice ?? basePrice) * quantity;
}

/** Affiche un avertissement si le temps jusqu'à la date d'expiration de la
 * carte de crédit est inférieur à ce nombre de millisecondes. */
export const CARD_EXPIRATION_WARNING = 60 * 24 * 60 * 60 * 1000;

export enum AutocompleteType {
	Near,
	Exact,
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
