import isUndefined from '../../utils/is-undefined';

export default function html(value) {
	let el = this.el[0];
	if (!el) return undefined;

	if (isUndefined(value)) return el.innerHTML;

	el.innerHTML = value;
	return this;
}
