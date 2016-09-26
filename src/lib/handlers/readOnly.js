import { hooks } from '../utils/hooks';

var handlerReadOnly = {
	set: function (target, key, value, receiver) {
		let msg = hooks.t('errors.readOnly');
		throw new Error(msg);
	}
};

export default handlerReadOnly;
