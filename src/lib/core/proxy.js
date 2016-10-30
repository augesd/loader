import Locales from '../classes/locales/constructor';
import '../classes/locales/prototype';
import Locale from '../classes/locale/constructor';
import '../classes/locale/prototype';

import Channels from '../classes/channels/constructor';
import '../classes/channels/prototype';
import Channel from '../classes/channel/constructor';
import '../classes/channel/prototype';

// main data proxy
var _dataProxy = new Map();

function proxy(key, ...params) {
	let curObj;
	if (!_dataProxy.has(key)) {
		switch (key) {
		case 'locales':
			curObj = new Locales();
			_dataProxy.set(key, curObj);
			if (params.length > 0) {
				curObj.set(params[0], new Locale());
			}
			break;
		case 'channels':
			curObj = new Channels();
			_dataProxy.set(key, curObj);
			if (params.length > 0) {
				curObj.set(params[0], new Channel());
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
