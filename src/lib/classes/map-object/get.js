export default function get(key) {
	if (!this._data.has(key)) {
		this._data.set(key, new Map());
	}
	return this._data.get(key);
}
