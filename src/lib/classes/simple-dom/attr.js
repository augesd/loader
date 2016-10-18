import isUndefined from '../../utils/is-undefined';

export default function attr(name, value) {
	if (!this.el) return undefined;

	if (isUndefined(value)) return this.el[0].getAttribute(name);

	for (var el of this.el) {
		el.setAttribute(name, value);
	}

	return this;
}
