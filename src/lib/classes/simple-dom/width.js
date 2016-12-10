export default function width ( mode ) {
	let el = this.el[ 0 ];
	if ( !el ) return undefined;
	
	let res = 0;
	
	switch ( mode ) {
	case 'client':
		res = el.clientWidth;
		break;
	case 'native':
		const styles           = window.getComputedStyle ( el );
		const width            = el.offsetWidth;
		const borderLeftWidth  = parseFloat ( styles.borderLeftWidth );
		const borderRightWidth = parseFloat ( styles.borderRightWidth );
		const paddingLeft      = parseFloat ( styles.paddingLeft );
		const paddingRight     = parseFloat ( styles.paddingRight );
		res                    = width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight;
		break;
	default:
		res = el.getBoundingClientRect ().width;
	}
	
	return res;
}
