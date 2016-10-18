import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function insertBefore(value) {
	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
	if (!this.el) return undefined;

	let el = this.el[0];
	if (!el) return undefined;

	const target = document.querySelector(value);
	target.parentNode.insertBefore(el, target);

	return this;
}
