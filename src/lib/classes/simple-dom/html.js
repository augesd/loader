import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function html(value) {
	if (!this.el) return undefined;

	if (isUndefined(value)) {
		let res = [];
		for (let el of this.el) {
			res.push(el.innerHTML);
		}
		return res.join('');

	} else {
		for (let el of this.el) {
			el.innerHTML = value;
		}
	}

	return this;
}
