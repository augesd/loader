import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function on(eventName, eventHandler) {
	if (isUndefined(eventName) || isUndefined(eventHandler)) throw new Error(hooks.t('errors.paramsRequired'));

	for (let el of this.el) {
		el.addEventListener(eventName, eventHandler);
	}

	return this;
}
