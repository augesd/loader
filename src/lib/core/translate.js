import { hooks } from '../utils/hooks';
import { LOCALE } from '../core/constants';
import isUndefined from '../utils/is-undefined';

function translate(key) {
	let locale = hooks.proxy('locales').get(hooks.locale),
	    res = locale ? locale.get(key) : null;

	if (!res || isUndefined(res)) res = hooks.proxy('locales').get(LOCALE).get(key);
	return res || `%${key}%`;
}

export default translate;
