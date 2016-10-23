import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function once(eventName, eventHandler) {
	if (isUndefined(eventName) || isUndefined(eventHandler)) throw new Error(hooks.t('errors.paramsRequired'));

	let handler = function () {
		eventHandler.apply(this, arguments);
		this.removeEventListener(eventName, handler);
	};

	for (let el of this.el) {
		el.addEventListener(eventName, handler);
	}

	return this;
}
