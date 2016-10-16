//! wgm.js locale configuration
//! locale : Russian [ru]

import manager from '../wgm';

export default manager.proxy('locales').add('ru', {
	'errors.readOnly': 'Не устанавливайте значения свойств для данного объекта',
	'errors.wrongSelector': 'Ошибка в описателе селектора',
	'wgm': 'Менеджер виджетов'
});
