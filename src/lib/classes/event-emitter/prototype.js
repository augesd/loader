import EventEmitter from './constructor';

let protoEventEmitter = EventEmitter.prototype;

import on from './on';
import off from './off';
import trigger from './trigger';

protoEventEmitter.on      = on;
protoEventEmitter.off     = off;
protoEventEmitter.trigger = trigger;
