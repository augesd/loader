import isUndefined from '../../utils/is-undefined';

export default function val(value) {
	let el = this.el[0];
	if (!el) return undefined;

	if (isUndefined(value)) return el.value;

	el.value = value;
	return this;
}
