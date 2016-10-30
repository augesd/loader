import Channel from './constructor';

let protoChannel = Channel.prototype;

import addListener from '../event-emitter/addListener';
import removeListener from '../event-emitter/removeListener';
import emit from '../event-emitter/emit';

protoChannel.addListener    = addListener;
protoChannel.removeListener = removeListener;
protoChannel.emit           = emit;
