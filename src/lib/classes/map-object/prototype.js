import MapObject from './constructor';

let protoMapObject = MapObject.prototype;

import _size from './_size';
import clear from './clear';
import deleteKey from './deleteKey';
import entries from './entries';
import forEach from './forEach';
import has from './has';
import get from './get';
import keys from './keys';
import set from './set';
import values from './values';

protoMapObject._size   = _size;
protoMapObject.clear   = clear;
protoMapObject.delete  = deleteKey;
protoMapObject.entries = entries;
protoMapObject.forEach = forEach;
protoMapObject.has     = has;
protoMapObject.get     = get;
protoMapObject.keys    = keys;
protoMapObject.set     = set;
protoMapObject.values  = values;
