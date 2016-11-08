import _size from './_size';

export default class MapObject {

	constructor() {
		this._data = new Map();
	}

	get size() {
		return _size();
	}

}
