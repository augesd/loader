import Locale from '../locale/constructor';

export default function get(key) {
	if (!this._data.has(key)) {
		this._data.set(key, new Locale());
	}
	return this._data.get(key);
}
