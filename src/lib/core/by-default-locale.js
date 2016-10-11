import { hooks } from '../utils/hooks';

export default function prepareLocale() {
	hooks.proxy('locales').add('en', {
		'errors.readOnly': 'Please don\'t set properties on this object.',
		'wgm': 'Widget Manager'
	});
}
