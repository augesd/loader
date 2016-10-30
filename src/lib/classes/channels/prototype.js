import Channels from './constructor';

let protoChannels = Channels.prototype;

import _size from '../map-object/_size';
import clear from '../map-object/clear';
import deleteKey from '../map-object/deleteKey';
import entries from '../map-object/entries';
import forEach from '../map-object/forEach';
import has from '../map-object/has';
//import get from '../map-object/get';
import keys from '../map-object/keys';
import set from '../map-object/set';
import values from '../map-object/values';
import add from './add';
import get from './get';

protoChannels._size   = _size;
protoChannels.clear   = clear;
protoChannels.delete  = deleteKey;
protoChannels.entries = entries;
protoChannels.forEach = forEach;
protoChannels.has     = has;
//protoChannels.get     = get;
protoChannels.keys    = keys;
protoChannels.set     = set;
protoChannels.values  = values;
protoChannels.add     = add;
protoChannels.get     = get;
