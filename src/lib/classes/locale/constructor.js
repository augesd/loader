import MapObject from '../map-object/constructor';

export default class Locale extends MapObject {

	constructor(data) {
		super();
		if (data) {
			this.update(data);
		}
	}

	get(key) {
		return this._data.get(key);
	}

	update(value) {
		for (let key in value) {
			this._data.set(key, value[key]);
		}
		return true;
	}

}
