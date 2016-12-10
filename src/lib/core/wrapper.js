import Wrapper from '../classes/wrapper/constructor';
import '../classes/wrapper/prototype';

function wrapper ( selector ) {
	return new Wrapper ( selector );
}

export default wrapper;
