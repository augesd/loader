import isUndefined from '../utils/is-undefined';
import handlerReadOnly from '../handlers/readOnly';

var settings = [];
//settings.push('locale');

function applyConfig(to, from) {
	console.info('constructor.applyConfig', arguments);
	let i, prop, val;

	if (!isUndefined(from._is)) to._is = from._is;

	to._params = new Proxy(from._input, handlerReadOnly);

	if (settings.length > 0) {
		for (i in settings) {
			prop = settings[i];
			val  = from[prop];
			if (!isUndefined(val)) to[prop] = val;
		}
	}

	return to;
}

// Manager prototype object
export function Manager(config) {
	applyConfig(this, config);
}

export function is(obj) {
	return obj instanceof Manager || (obj != null && obj._is != null);
}
