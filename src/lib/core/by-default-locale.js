import { hooks } from '../utils/hooks';

export default function prepareLocale() {
	hooks.proxy('locales').add('en', {
		'errors.readOnly': 'Please don\'t set properties on this object',
		'errors.wrongSelector': 'Wrong selector',
		'errors.paramsRequired': 'Params required',
		'wgm': 'Widget Manager'
	});
}
