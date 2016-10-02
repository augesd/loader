import { hooks } from '../../utils/hooks';
import MapObject from '../map-object/constructor';
import Locale from '../locale/constructor';

export default class Locales extends MapObject {

	add(key, value) {
		if (!key || !value || this.has(key)) {
			return false;
		}
		this.set(key, new Locale(value));

		if (!hooks.locale) {
			hooks.locale = key;
		}
	}

}
