import isUndefined from '../../utils/is-undefined';

export default function text(value) {
	let el = this.el[0];
	if (!el) return undefined;

	if (isUndefined(value)) return el.textContent;

	el.textContent = value;
	return this;
}
