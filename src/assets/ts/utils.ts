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
