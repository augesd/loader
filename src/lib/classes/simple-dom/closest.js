export default function closest(selector) {
	let el = this.el;

	// Нативно - Only latest, NO IE
	if (el.closest) return el.closest(selector);

	// Нативно - IE10+
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		} else {
			el = el.parentElement;
		}
	}
	return null;
}
