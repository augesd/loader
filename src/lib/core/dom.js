import { hooks } from '../utils/hooks';
import SimpleDom from '../classes/simple-dom/constructor';
import '../classes/simple-dom/prototype';

function dom(selector) {
	if (typeof selector === 'undefined') throw new Error(hooks.t('errors.wrongSelector'));
	if (typeof window.jQuery !== 'undefined') return window.jQuery.apply(window.jQuery, [selector]);
	return new SimpleDom(selector);
}

export default dom;
