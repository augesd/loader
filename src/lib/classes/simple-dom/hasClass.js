import { hooks } from '../../utils/hooks';

import isUndefined from '../../utils/is-undefined';

export default function hasClass ( value ) {
	if ( isUndefined ( value ) ) throw new Error ( hooks.t ( 'errors.paramsRequired' ) );
	if ( !this.el ) return undefined;
	
	let el        = this.el[ 0 ],
	    className = value;
	
	if ( el.classList ) {
		
		return el.classList.contains ( className );
		
	} else {
		
		return el.className && new RegExp ( '(^|\\s)' + className + '(\\s|$)' ).test ( el.className );
		
	}
}
