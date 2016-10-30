import Wrapper from './constructor';

let protoWrapper = Wrapper.prototype;

import scan from './scan';
import postMessage from './postMessage';

protoWrapper.scan = scan;
protoWrapper.pm   = postMessage;
