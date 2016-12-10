export default function height ( mode ) {
	let el = this.el[ 0 ];
	if ( !el ) return undefined;
	
	let res = 0;
	
	switch ( mode ) {
	case 'client':
		res = el.clientHeight;
		break;
	case 'native':
		const styles            = window.getComputedStyle ( el );
		const height            = el.offsetHeight;
		const borderTopWidth    = parseFloat ( styles.borderTopWidth );
		const borderBottomWidth = parseFloat ( styles.borderBottomWidth );
		const paddingTop        = parseFloat ( styles.paddingTop );
		const paddingBottom     = parseFloat ( styles.paddingBottom );
		res                     = height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
		break;
	default:
		res = el.getBoundingClientRect ().height;
	}
	
	return res;
}
