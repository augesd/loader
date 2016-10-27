export default function position() {
	let el = this.el[0];
	if (!el) return undefined;

	return {left: el.offsetLeft, top: el.offsetTop};
}
