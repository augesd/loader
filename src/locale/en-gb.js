//! wgm.js locale configuration
//! locale : English (United Kingdom) [en-gb]

import manager from '../wgm';

export default manager.proxy('locales').add('en-gb', {
	'errors.readOnly': 'Please don\'t set properties on this object.',
	'wgm': 'Widget Manager'
});
