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

export function phoneFormat(phone: string) {
	const arr = phone.substring(2).split('');
	const res = [`0${arr[0]}`];
	for (let i = 1; i < 9; i += 2) res.push(`${arr[i]}${arr[i + 1]}`);
	return res.join(' ');
}

export function formattedToPhone(formatted: string) {
	return `33${formatted.substring(1).replace(' ', '')}`;
}
