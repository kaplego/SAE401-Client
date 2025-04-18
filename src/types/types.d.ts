declare type ID = string | number;
declare type ButtonStyle = 'primary' | 'secondary' | 'danger' | 'warning' | 'success';

declare type Autocomplete = {
	type: AutocompleteType;
	values: string[];
};

declare type Option = {
	label: string;
	value: string;
};
declare type OptionGroup = {
	label: string;
	options: Option[];
};

declare type APIResponseError = {
	status: string;
	title: string;
	errors: Record<string, string[]>;
};

type CartItem = Omit<DetailPanier, 'idclient' | 'clientNavigation' | 'colorationNavigation'>;

interface BreadcrumbBaseItem {
	type: 'text' | 'link';
	label: string;
	key: string;
}

interface BreadcrumbLinkItem extends BreadcrumbBaseItem {
	type: 'link';
	path: string;
}

interface BreadcrumbTextItem extends BreadcrumbBaseItem {
	type: 'text';
}

type AnyBreadcrumbItem = BreadcrumbLinkItem | BreadcrumbTextItem;
