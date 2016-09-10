import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import { Loader, isLoader } from '../core/constructor';
import { getLocale } from '../locale/locales';
import { hooks } from '../utils/hooks';
import checkOverflow from './check-overflow';

function createFromConfig(config) {
	var res = new Loader(checkOverflow(prepareConfig(config)));

	return res;
}

export function prepareConfig(config) {
	var input = config._i;

	config._locale = config._locale || getLocale(config._l);

	if (typeof input === 'string') {
		config._i = input = config._locale.preparse(input);
	}

	if (isLoader(input)) {
		return new Loader(checkOverflow(input));
	}

	return config;
}

export function createLocalByDefault(input, locale, strict) {
	var c = {};

	if (typeof(locale) === 'boolean') {
		strict = locale;
		locale = undefined;
	}

	if ((isObject(input) && isObjectEmpty(input)) ||
		(isArray(input) && input.length === 0)) {
		input = undefined;
	}

	c._isALoaderObject = true;
	c._l               = locale;
	c._i               = input;
	c._strict          = strict;

	return createFromConfig(c);
}
