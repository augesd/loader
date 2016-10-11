import { hooks } from '../../utils/hooks';
import Locale from '../locale/constructor';

export default function add(key, value) {
	if (!key || !value || this.has(key)) {
		return false;
	}
	this.set(key, new Locale(value));

	if (!hooks.locale) {
		hooks.locale = key;
	}
}
