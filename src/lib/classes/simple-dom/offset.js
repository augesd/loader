export default function offset() {
	let el = this.el[0];
	if (!el) return undefined;

	const box = el.getBoundingClientRect();

	return {
		top: box.top + window.pageYOffset - document.documentElement.clientTop,
		left: box.left + window.pageXOffset - document.documentElement.clientLeft
	};
}
