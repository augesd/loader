import MapObject from '../map-object/constructor';

export default class Locale extends MapObject {

	constructor(data) {
		super();
		if (data) {
			this.update(data);
		}
	}

}
