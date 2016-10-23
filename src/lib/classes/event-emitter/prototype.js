import EventEmitter from './constructor';

let protoEventEmitter = EventEmitter.prototype;

import addListener from './addListener';
import removeListener from './removeListener';
import emit from './emit';

protoEventEmitter.addListener    = addListener;
protoEventEmitter.removeListener = removeListener;
protoEventEmitter.emit           = emit;
