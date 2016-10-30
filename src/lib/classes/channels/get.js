import Channel from '../channel/constructor';

export default function get(key) {
	if (!this._data.has(key)) {
		this._data.set(key, new Channel());
	}
	return this._data.get(key);
}
