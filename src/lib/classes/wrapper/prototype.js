import Wrapper from './constructor';

let protoWrapper = Wrapper.prototype;

import scan from './scan';

protoWrapper.scan = scan;
