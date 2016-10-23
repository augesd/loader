import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function trigger(eventName, eventData) {
	if (isUndefined(eventName)) throw new Error(hooks.t('errors.paramsRequired'));

	if (window.CustomEvent) {
		const event = new CustomEvent(eventName, {detail: eventData});
	} else {
		const event = document.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, eventData);
	}

	for (let el of this.el) {
		el.dispatchEvent(event);
	}

	return this;
}
