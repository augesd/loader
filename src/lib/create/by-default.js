import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import { Manager, is } from '../core/constructor';
import { getLocale } from '../locale/locales';
import { hooks } from '../utils/hooks';
import checkOverflow from './check-overflow';

// verify input values
function prepareConfig(config) {
	let input = config._i;

	if (is(input)) return new Manager(checkOverflow(input));

	config._locale = config._locale || getLocale(input ? input.locale : null);

	config.test = true;

	console.info('byDefault.prepareConfig', config);

	return config;
}

export function getInstance(input) {
	let c = {};

	if ((isObject(input) && isObjectEmpty(input)) ||
		(isArray(input) && input.length === 0)) {
		input = undefined;
	}

	c._is = true;
	c._i  = input;

	return new Manager(checkOverflow(prepareConfig(c)));
}
