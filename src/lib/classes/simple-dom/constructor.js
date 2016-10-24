import EventEmitter from '../event-emitter/constructor';

export default class SimpleDom extends EventEmitter {

	constructor(selector) {
		super();

		//this.el = [];

		if (typeof (selector) === 'object') {
			this.byEl(selector);
		} else {
			this.bySelector(selector);
		}
	}

	get element() {
		return [...this.el];
	}

	get length() {
		return this.el ? this.el.length : 0;
	}

	byEl(selector) {
		this.el = [selector];
		return this;
	}

	bySelector(selector) {
		this.el = document.querySelectorAll(selector);
		return this;
	}

	byClass(selector) {
		this.el = document.getElementsByClassName(selector);
		return this;
	}

	byID(selector) {
		this.el = document.getElementById(selector);
		return this;
	}

}
