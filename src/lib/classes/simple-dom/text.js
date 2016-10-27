import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function text(value) {
	if (!this.el) return undefined;

	if (isUndefined(value)) {
		let res = [];
		for (let el of this.el) {
			res.push(el.textContent);
		}
		return res.join('');
	} else {
		for (let el of this.el) {
			el.textContent = value;
		}
	}

	return this;
}
