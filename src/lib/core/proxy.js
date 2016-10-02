import MapObject from '../classes/map-object/constructor';
import Locales from '../classes/locales/constructor';
import Locale from '../classes/locale/constructor';

// main data proxy
var _dataProxy = new Map();

function proxy(key, ...params) {
	if (!_dataProxy.has(key)) {
		switch (key) {
		case 'locales':
			let curObj = new Locales();
			_dataProxy.set(key, curObj);
			if (params.length > 0) {
				curObj.set(params[0], new Locale());
			}
			break;
		default:
			throw new Error('Wrong proxy name: ' + key);
		}
		if (params.length === 2) {
			_dataProxy.get(key).get(params[0]).update(params[1]);
		}
	}

	return _dataProxy.get(key);
}

export default proxy;
