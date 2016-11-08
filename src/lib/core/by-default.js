import isArray from '../utils/is-array';
import isObject from '../utils/is-object';
import isObjectEmpty from '../utils/is-object-empty';
import {Manager, is} from '../core/constructor';

// verify input values
function prepareConfig(config) {
	let input = config._input;
	
	if (is(input)) {
		return new Manager(input);
	}
	
	return config;
}

export function defaultInstance(input) {
	console.info('by-default.getInstance', input);
	let c = {};
	
	if (
		(isObject(input) && isObjectEmpty(input)) ||
		(isArray(input) && input.length === 0)) {
		input = undefined;
	}
	
	c._is    = true;
	c._input = input;
	
	return new Manager(prepareConfig(c));
}
