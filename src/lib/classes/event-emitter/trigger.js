function trigger(label, ...args) {
	let listeners = this.listeners.get(label);

	if (listeners && listeners.length) {
		listeners.forEach((listener) => {
			listener(...args);
		});
		return true;
	}
	return false;
}

export default trigger;
