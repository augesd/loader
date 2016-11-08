import {hooks} from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';
import arrayUnique from '../../utils/arrayUnique';

export default function toggleClass(value) {
	if (isUndefined(value)) throw new Error(hooks.t('errors.paramsRequired'));
	if (!this.el) return undefined;
	
	for (var el of this.el) {
		let list = value.split(' ');
		for (let className of list) {
			if (el.classList) {
				
				el.classList.toggle(className);
				
			} else {
				
				let classesList = el.className.split(' ');
				
				if (el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)) {
					
					let classesRemove = String(className).replace(/[\n\t]/g, ' ').split(' '),
					    classesNew    = [];
					for (let i = 0; i < classesList.length; i++) {
						if (classesRemove.indexOf(classesList[i]) < 0) classesNew.push(classesList[i]);
					}
					el.className = arrayUnique(classesNew).join(' ');
					
				} else {
					
					let classesAdd = String(className).replace(/[\n\t]/g, ' ').split(' ');
					for (let i = 0; i < classesAdd.length; i++) {
						if (classesList.indexOf(classesAdd[i]) < 0) classesList.push(classesAdd[i]);
					}
					
					el.className = arrayUnique(classesList).join(' ');
				}
				
			}
		}
	}
	
	return this;
}
