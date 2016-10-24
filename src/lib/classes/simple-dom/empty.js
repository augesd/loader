export default function empty() {
	if (!this.el) return undefined;

	for (let el of this.el) {
		el.innerHTML = '';
	}

	return this;
}
