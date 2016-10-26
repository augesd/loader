import { Manager } from './constructor';

var proto = Manager.prototype;

import addListener from '../classes/event-emitter/addListener';
import removeListener from '../classes/event-emitter/removeListener';
import emit from '../classes/event-emitter/emit';

proto.addListener    = addListener;
proto.removeListener = removeListener;
proto.emit           = emit;

import wrapper from './wrapper';

proto.wrapper = wrapper;
