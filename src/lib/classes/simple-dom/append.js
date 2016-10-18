import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function append(value) {
	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
	if (!this.el) return undefined;

	for (var el of this.el) {
		el.insertAdjacentHTML('beforeend', value);
	}

	return this;
}
