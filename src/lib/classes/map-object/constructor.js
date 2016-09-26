export default class MapObject {

	constructor() {
		this._data = new Map;
	}

	has(key) {
		return this._data.has(key);
	}

	get(key) {
		return this._data.get(key) || new Map;
	}

	set(key, value) {
		return this._data.set(key, value);
	}

}
