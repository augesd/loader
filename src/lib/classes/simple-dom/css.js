import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';
import isObject from '../../utils/is-object';

export default function css(value) {
	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
	if (!this.el) return undefined;

	if (isObject(value)) {
		for (let el of this.el) {
			//let newStyles = [];
			for (let prop in value) {
				let val        = value[prop];
				//newStyles.push(prop+':'+val);
				el.style[prop] = val;
			}
			//el.setAttribute('style', newStyles.join(';'));
		}
		return this;
	}

	return window.getComputedStyle(this.el[0], null).getPropertyValue(value);
}
