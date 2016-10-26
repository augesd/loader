import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function removeClass(value) {
	if (isUndefined(value)) throw new Error( hooks.t('errors.paramsRequired') );
	if (!this.el) return undefined;

	for (var el of this.el) {
		let list = value.split(' ');
		for (let className of list) {
			el.classList.remove(className);
		}
	}

	return this;
}