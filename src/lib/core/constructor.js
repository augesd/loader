import { hooks } from '../utils/hooks';
import hasOwnProp from '../utils/has-own-prop';
import isUndefined from '../utils/is-undefined';

// Plugins that add properties should also add the key here (null value),
// so we can properly clone ourselves.
var settings = [];

settings.a = 'aaaa';
settings.b = 'bbbb';
settings.c = false;
settings.d = {};

hooks.settings = settings;

function applyConfig(to, from) {
	let i, prop, val;

	console.info('construct.applyConfig');

	if (!isUndefined(from._is)) {
		to._is = from._is;
	}

	console.info(settings);

	if (settings.length > 0) {
		console.info('construct.settings');
		for (i in settings) {
			prop = settings[i];
			console.info(i,prop);
			val  = from[prop];
			if (!isUndefined(val)) {
				to[prop] = val;
			}
		}
	}

	return to;
}

// Manager prototype object
export function Manager(config) {
	console.info('construct.Manager',config);
	applyConfig(this, config);
}

export function is(obj) {
	return obj instanceof Manager || (obj != null && obj._is != null);
}
