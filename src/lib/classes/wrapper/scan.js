import { hooks } from '../../utils/hooks';

function scan() {
	// Return the promise
	return new Promise((resolve, reject) => {
		if (!this.selector) reject(hooks.t('errors.wrongSelector'));
		resolve( hooks.$(this.selector) );
	});
}

export default scan;
