import EventEmitter from '../event-emitter/constructor';

export default class SimpleDom extends EventEmitter {

	constructor(selector) {
		super();
		this.bySelector(selector);
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
