export default function remove() {
	if (!this.el) return undefined;

	for (let el of this.el) {
		el.parentNode.removeChild(el);
	}

	return this;
}
