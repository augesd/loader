export default function update(value) {
	for (let key in value) {
		this._data.set(key, value[key]);
	}
	return true;
}
