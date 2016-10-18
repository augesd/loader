import isFunction from '../../utils/is-function';

function off(label, callback) {
	let listeners = this.listeners.get(label),
	    index;

	if (listeners && listeners.length) {
		index = listeners.reduce((i, listener, index) => {
			return (isFunction(listener) && listener === callback) ?
				i = index :
				i;
		}, -1);

		if (index > -1) {
			listeners.splice(index, 1);
			this.listeners.set(label, listeners);
			return true;
		}
	}
	return false;
}

export default off;
