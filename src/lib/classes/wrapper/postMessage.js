import Postmate from '../../../../vendor/postmate/src/postmate';

function postMessage ( options ) {
	return new Postmate ( options );
}

export default postMessage;
