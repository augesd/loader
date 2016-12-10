import { hooks } from '../../utils/hooks';

function scan ( force ) {
	// Return the promise
	
	return new Promise ( ( resolve, reject ) => {
		if ( !this.selector ) reject ( hooks.t ( 'errors.wrongSelector' ) );
		
		let res = hooks.$ ( this.selector + (force ? '' : ':not([data-ready="1"])') );
		res.data ( 'ready', '1' );
		
		resolve ( res );
	} );
}

export default scan;
