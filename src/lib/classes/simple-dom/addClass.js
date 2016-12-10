import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';
import arrayUnique from '../../utils/arrayUnique';

export default function addClass ( value ) {
	if ( isUndefined ( value ) ) throw new Error ( hooks.t ( 'errors.paramsRequired' ) );
	if ( !this.el ) return undefined;
	
	for ( var el of this.el ) {
		let list = value.split ( ' ' );
		for ( let className of list ) {
			if ( el.classList ) {
				el.classList.add ( className );
			} else {
				let classesList = el.className.split ( ' ' );
				let classesAdd  = String ( className ).replace ( /[\n\t]/g, ' ' ).split ( ' ' );
				for ( let i = 0; i < classesAdd.length; i++ ) {
					if ( classesList.indexOf ( classesAdd[ i ] ) < 0 ) classesList.push ( classesAdd[ i ] );
				}
				el.className = arrayUnique ( classesList ).join ( ' ' );
			}
		}
	}
	
	return this;
}
