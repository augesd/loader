function addListener(label, callback) {
	if (!this.listeners.has(label)) this.listeners.set(label, []);
	this.listeners.get(label).push(callback);
}

export default addListener;
