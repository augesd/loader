//! wgm.js locale configuration
//! locale : English [en]

import manager from '../wgm';

export default manager.proxy('locales').add('en', {
	'errors.readOnly': 'Please don\'t set properties on this object',
	'errors.wrongSelector': 'Wrong selector',
	'wgm': 'Widget Manager'
});
