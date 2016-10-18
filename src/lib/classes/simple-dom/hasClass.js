import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function hasClass(value) {
	if (isUndefined(value)) throw new Error( hooks.t('errors.paramsRequired') );
	if (!this.el) return undefined;

	return this.el[0].classList.contains(value);
}
