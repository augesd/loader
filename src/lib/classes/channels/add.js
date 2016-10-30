import Channel from '../channel/constructor';

export default function add(key, value) {
	if (!key || !value || this.has(key)) {
		return false;
	}
	this.set(key, new Channel(value));
}
