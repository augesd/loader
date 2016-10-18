function on(label, callback) {
	this.listeners.has(label) || this.listeners.set(label, []);
	this.listeners.get(label).push(callback);
}

export default on;
