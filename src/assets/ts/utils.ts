export default function isInEnum<T extends object>(e: T, value: unknown): value is T[keyof T] {
	const values = Object.values(e);
	return values.includes(value);
}
