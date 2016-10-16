import { hooks } from '../../utils/hooks';

function scan() {
	// Return the promise
	return new Promise((resolve, reject) => {
		if (!this.selector) reject(hooks.t('errors.wrongSelector'));

		let items = hooks.$(this.selector);

		console.info(items);

		resolve(this.selector || `%${this.selector}%`);
	});
}

export default scan;
